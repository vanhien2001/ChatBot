import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./features/Auth";
import Home from "./features/Home";
import store from "./store";
import "./App.css";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </Provider>
    );
};

export default App;
