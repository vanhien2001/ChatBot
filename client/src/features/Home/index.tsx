import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { userSelector } from "../../store/reducers/userSlice";
import ChatContainer from "./ChatContainer";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector(userSelector);


    useEffect(() => {
        if (!user) {
            navigate("./auth/login");
        }
    }, [user]);
    return (
        <div className="flex">
            <div className="w-2/12">
                <Sidebar />
            </div>
            <div className="w-10/12">
                <ChatContainer />
            </div>
        </div>
    );
};

export default Home;
