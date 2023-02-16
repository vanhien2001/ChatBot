import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPaperPlane,
    faSpinner,
    faTrash,
    faCheck,
    faXmark,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { userSelector } from "../../store/reducers/userSlice";
import {
    conversationSelector,
    deleteConversation,
    setConversation,
    getAll as getAllConversations,
} from "../../store/reducers/conversationSlice";
import {
    messageSelector,
    getAll,
    addmessage,
    requestBot,
    clearData,
} from "../../store/reducers/messageSlice";
import { useAppSelector, useAppDispatch } from "../../store";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const ChatContainer = () => {
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(userSelector);
    const { conversationId, conversations } =
        useAppSelector(conversationSelector);
    const { messageLoading, messages } = useAppSelector(messageSelector);
    const [text, setText] = useState<string>("");
    const [botLoading, setBotLoading] = useState<Boolean>(false);
    const [showConfirm, setShowConfirm] = useState<Boolean>(false);

    const sendMessage = (text: string) => {
        setText("");
        dispatch(
            addmessage({
                conversationId: conversationId,
                bot: false,
                text,
            })
        )
            .then(() => dispatch(getAll(conversationId)))
            .then(() => {
                setText("Green will response you soon ....");
                setBotLoading(true);
            })
            .then(() =>
                dispatch(
                    requestBot({
                        conversationId: conversationId,
                        bot: false,
                        text,
                    })
                )
            )
            .then(() => dispatch(getAll(conversationId)))
            .then(() => {
                setText("");
                setBotLoading(false);
            });
    };

    const onDelete = () => {
        dispatch(deleteConversation(conversationId))
            .then(() => dispatch(setConversation("")))
            .then(() => dispatch(clearData()))
            .then(() =>
                dispatch(getAllConversations(user?._id ? user._id : ""))
            );
    };

    useEffect(() => {
        setShowConfirm(false);
    }, [conversationId]);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, botLoading]);

    return (
        <div className="bg-input_back h-screen pr-0 flex flex-col bg-[url('https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cd.png')]">
            {conversationId ? (
                <div className="px-10 py-5 text-text_color border-solid border-b-2 border-text_color2 chat flex items-center justify-between">
                    <div className="text-text_color3">
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="hidden max-[768px]:inline-block mr-5 hover:text-green"
                            onClick={() => dispatch(setConversation(""))}
                        />
                        {
                            conversations.find(
                                (index) => index._id == conversationId
                            )?.name
                        }
                    </div>
                    <div className="flex items-center">
                        {showConfirm ? (
                            <>
                                <FontAwesomeIcon
                                    title="Confirm"
                                    icon={faCheck}
                                    className="mr-3 cursor-pointer hover:text-green text-lg"
                                    onClick={() => onDelete()}
                                />
                                <FontAwesomeIcon
                                    title="Cancel"
                                    icon={faXmark}
                                    className="mr-5 cursor-pointer hover:text-red text-lg"
                                    onClick={() => setShowConfirm(false)}
                                />
                            </>
                        ) : (
                            ""
                        )}
                        <div
                            title="Delete"
                            onClick={() => setShowConfirm(true)}
                            className="rounded-full w-7 h-7 flex items-center justify-center text-text_color2 cursor-pointer hover:bg-red hover:text-text_color3"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="flex-1 flex flex-col overflow-y-auto px-5 border-solid border-b-2 border-text_color2 pt-5">
                {!conversationId ? (
                    <div className="px-10 py-5 text-text_color h-full flex items-center justify-center">
                        <div className="">
                            Select or create conversation to chat with Green
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {messages.map((message, index) => {
                    if (message.bot) {
                        return (
                            <div key={index} className="flex mb-5" ref={ref}>
                                <img
                                    src="/green-logo.png"
                                    alt=""
                                    className="h-6 w-6 rounded-full mr-5"
                                />
                                <div className="w-8/12">
                                    <div className=" text-text_color text-xs font-bold">
                                        ChatBot Green
                                    </div>
                                    <div className="flex">
                                        <div className="bg-input_bac text-text_color rounded-md p-3 my-2">
                                            {message.text}
                                        </div>
                                    </div>
                                    <div className="text-text_color text-xs font-normal">
                                        {timeAgo.format(
                                            new Date(
                                                message.createdAt
                                                    ? message.createdAt
                                                    : ""
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={index}
                                className="flex flex-row-reverse mb-5"
                                ref={ref}
                            >
                                <img
                                    src="/avatar.png"
                                    alt=""
                                    className="h-6 w-6 rounded-full ml-5"
                                />
                                <div className="w-8/12">
                                    <div className=" text-text_color text-xs font-bold text-right">
                                        You
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-green2 text-text_color rounded-md p-3 my-2">
                                            {message.text}
                                        </div>
                                    </div>
                                    <div className="text-text_color text-xs font-normal text-right">
                                        {timeAgo.format(
                                            new Date(
                                                message.createdAt
                                                    ? message.createdAt
                                                    : ""
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
                {botLoading ? (
                    <div className="flex mb-5" ref={ref}>
                        <img
                            src="/green-logo.png"
                            alt=""
                            className="h-6 w-6 rounded-full mr-5"
                        />
                        <div className="w-8/12">
                            <div className=" text-text_color text-xs font-bold">
                                ChatBot Green
                            </div>
                            <div className="flex">
                                <div className="bg-input_bac text-text_color rounded-md p-3 my-2 botResponse animate-pulse">
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="animate-spin mr-2"
                                    />
                                    Processing...
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <form
                className="h-24 flex justify-center items-center chat max-[768px]:px-5"
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(text);
                }}
            >
                <input
                    type="text"
                    className={`text-text_color2 bg-input_bac w-10/12 px-5 py-2 rounded-md outline-none border-solid border-2 border-input_back focus:border-green ${
                        messageLoading || !conversationId
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                    placeholder="Chat Some Thing"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={messageLoading || !conversationId}
                    required
                />
                <button
                    type="submit"
                    className={`text-text_color w-20 rounded-md h-10 ml-5 hover:bg-green hover:text-text_color3 ${
                        messageLoading || !conversationId
                            ? "cursor-not-allowed"
                            : ""
                    } ${text ? "bg-green text-text_color3" : "bg-green2"}`}
                    disabled={messageLoading || !conversationId}
                >
                    {messageLoading ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin"
                        />
                    ) : (
                        <FontAwesomeIcon icon={faPaperPlane} />
                    )}
                </button>
            </form>
        </div>
    );
};

export default ChatContainer;
