import React, { useEffect, useRef, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { conversationSelector } from "../../store/reducers/conversationSlice";
import {
    messageSelector,
    getAll,
    addmessage,
    requestBot,
} from "../../store/reducers/messageSlice";
import { useAppSelector, useAppDispatch } from "../../store";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const ChatContainer = () => {
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const { conversationId } = useAppSelector(conversationSelector);
    const { messageLoading, messages } = useAppSelector(messageSelector);
    const [text, setText] = useState<string>("");

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
            .then(() => setText('Green will response you soon ....'))
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
            .then(() => setText(''))
    };

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="bg-input_back h-screen p-5 pr-0 flex flex-col bg-[url('https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cd.png')]">
            <div className="flex-1 flex flex-col overflow-y-auto pr-5">
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
                                    src="/green-logo.png"
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
            </div>
            <div className=" h-16 border-solid border-t-2 border-text_color2 flex justify-center items-center">
                <input
                    type="text"
                    className={`text-text_color2 bg-input_bac w-10/12 px-5 py-2 rounded-md outline-none border-solid border-2 border-input_back focus:border-green ${messageLoading ? 'cursor-not-allowed' : ''}`}
                    placeholder="Chat Some Thing"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={messageLoading}
                />
                <button
                    className={`text-text_color w-20 rounded-md bg-green2 h-10 ml-5 hover:opacity-90 ${messageLoading ? 'cursor-not-allowed' : ''}`}
                    onClick={() => sendMessage(text)}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatContainer;
