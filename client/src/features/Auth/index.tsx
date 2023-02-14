import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
        <div className="flex items-center justify-center h-screen bg-green">
            <div className="container w-1/2 rounded-3xl bg-bg_back py-10">
                <div className="text-text_color text-center text-2xl font-semibold ">
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
