import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRightFromBracket,
    faSpinner,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
    conversationSelector,
    getAll,
    setConversation,
    addConversation,
} from "../../store/reducers/conversationSlice";
import {
    messageSelector,
    getAll as getAllMessage,
} from "../../store/reducers/messageSlice";
import { userSelector, logout } from "../../store/reducers/userSlice";
import { useAppSelector, useAppDispatch } from "../../store";

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { conversationLoading, conversations } =
        useAppSelector(conversationSelector);
    const { messageLoading, messages } = useAppSelector(messageSelector);
    const { user } = useAppSelector(userSelector);
    const [showConversationAdd, setShowConversationAdd] =
        useState<Boolean>(false);
    const [conversationName, setConversationName] = useState<string>("");

    const loadMessage = (conversation: string) => {
        dispatch(setConversation(conversation));
        dispatch(getAllMessage(conversation));
    };

    const onSubmit = () => {
        if (user) {
            console.log({
                userId: user._id ? user._id : "",
                name: conversationName,
            });
            dispatch(
                addConversation({
                    userId: user._id ? user._id : "",
                    name: conversationName,
                })
            ).then(() => {
                dispatch(getAll(user._id ? user._id : ""));
                setConversationName("");
            });
        }
    };

    const onLogout = () => {
        dispatch(logout());
        navigate("/auth/login");
    };

    useEffect(() => {
        if (user) {
            dispatch(getAll(user._id ? user._id : ""));
        }
    }, [user]);

    return (
        <div className="bg-bg_back px-5 pt-5 text-text_color h-screen flex justify-between flex-col">
            <div className="border-solid border-b-2 border-text_color2 flex-1">
                <div className="mx-auto text-3xl text-center text-text_color3">
                    Chat Bot
                </div>
                <div className="mx-auto text-lg mt-5 text-center text-text_color3">
                    {user?.name}
                </div>
                {!showConversationAdd ? (
                    <button
                        className="my-10 border-text_color rounded-md text-left px-5 py-2 border-solid border-2 border-text_color w-full hover:bg-input_back"
                        onClick={() => setShowConversationAdd(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> New
                        chat
                    </button>
                ) : (
                    ""
                )}
                {showConversationAdd ? (
                    <div className="my-10">
                        <input
                            type="text"
                            className="w-full bg-bg_back border-solid border-2 border-text_color px-5 py-2 rounded-md outline-none"
                            placeholder="Name Conversation"
                            value={conversationName}
                            onChange={(e) =>
                                setConversationName(e.target.value)
                            }
                        />
                        <div className="flex justify-between mt-5">
                            <button
                                className="px-5 py-2 rounded-md border-solid border-2 border-text_color2 bg-green2 w-5/12 hover:bg-green hover:text-text_color3"
                                onClick={onSubmit}
                            >
                                {conversationLoading ? (
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="animate-spin"
                                    />
                                ) : (
                                    "Add"
                                )}
                            </button>
                            <button
                                className="text-center py-2 rounded-md w-5/12 border-solid border-2 border-text_color2 hover:bg-red hover:text-text_color3"
                                onClick={() => setShowConversationAdd(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div className="overflow-y-scroll overflow-x-hidden h-80">
                    {conversations.map((conversation, index) => {
                        return (
                            <div
                                key={index}
                                className={`${
                                    index == conversations.length - 1
                                        ? ""
                                        : "mb-5"
                                } bg-input_back cursor-pointer px-5 py-2 rounded-md hover:opacity-80 whitespace-nowrap text-ellipsis overflow-hidden`}
                                onClick={() =>
                                    loadMessage(
                                        conversation._id ? conversation._id : ""
                                    )
                                }
                            >
                                {conversation.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="h-24 flex items-center">
                <button
                    className="border-text_color rounded-md text-left px-5 py-2 w-full hover:bg-input_back"
                    onClick={onLogout}
                >
                    <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="logoutBtn"
                    />
                    <span className="ml-4">Log out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
