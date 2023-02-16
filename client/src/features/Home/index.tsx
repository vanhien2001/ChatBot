import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { userSelector } from "../../store/reducers/userSlice";
import { conversationSelector } from "../../store/reducers/conversationSlice";
import ChatContainer from "./ChatContainer";
import Notify from "../../components/Notify";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector(userSelector);
    const { conversationId } = useAppSelector(conversationSelector);

    useEffect(() => {
        if (!user) {
            navigate("./auth/login");
        }
    }, [user]);
    return (
        <div className="flex max-[768px]:h-screen relative overflow-hidden">
            <div className="w-2/12 max-[768px]:w-full">
                <Sidebar />
            </div>
            <div className={`transition-all w-10/12 max-[768px]:absolute max-[768px]:top-0 max-[768px]:bottom-0 max-[768px]:w-screen ${conversationId ? 'left-0' : 'left-full'}`}>
                <ChatContainer />
            </div>
        </div>
    );
};

export default Home;
