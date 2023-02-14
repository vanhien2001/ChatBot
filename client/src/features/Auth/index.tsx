import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ReactComponent as ChatbotSvg } from "../../assets/chatbot.svg";
import { ReactComponent as TypingSvg } from "../../assets/typing.svg";
import { ReactComponent as ChatSvg } from "../../assets/chat2.svg";
import { useAppSelector, useAppDispatch } from "../../store";
import { userSelector, login, load } from "../../store/reducers/userSlice";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(userSelector);

    useEffect(() => {
        dispatch(load());
    }, []);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);
    return (
        <div className="flex items-center justify-center h-screen bg-green relative overflow-hidden">
            <ChatbotSvg className="absolute left-5 -top-20 w-4/12"/>
            <ChatSvg className="absolute right-5 -bottom-24 w-3/12"/>
            {/* <TypingSvg className="absolute right-20 -top-40 w-72"/> */}
            <div className="container w-1/2 rounded-3xl bg-bg_back py-10">
                <div className="text-text_color3 text-center text-2xl font-semibold ">
                    Welcome Back !
                </div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </div>
    );
};

export default Auth;
