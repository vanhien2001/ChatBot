import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    userSelector,
    login,
    load,
    clearMessage,
} from "../../store/reducers/userSlice";

interface IFormValue {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { authLoading, message } = useAppSelector(userSelector);
    const [formValue, setFormValue] = useState<IFormValue>({
        username: "",
        password: "",
    });

    const onSubmit = () => {
        dispatch(login(formValue)).then(() => dispatch(load()));
    };

    useEffect(() => {
        setTimeout(() => dispatch(clearMessage()), 3000);
    }, [message]);

    return (
        <>
            <div className="text-text_color3 text-center text-xl font-semibold mt-2">
                Sign In
            </div>
            <form
                className="w-1/2 mx-auto mt-5"
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div
                    className={`text-text_color3 bg-red text-center text-sm font-semibold mb-1 py-1 rounded-md ${
                        message
                            ? message?.success
                                ? "invisible"
                                : ""
                            : "invisible"
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="mr-2"
                    />
                    {message?.messages}
                </div>
                <span className="block text-text_color3 text-base font-semibold">
                    Username :
                </span>
                <input
                    type="text"
                    className="text-text_color bg-input_back w-full px-5 py-2 rounded-md mt-3 outline-none border-solid border-2 border-input_back focus:border-green"
                    placeholder="Enter your username"
                    value={formValue.username}
                    onChange={(e) =>
                        setFormValue({ ...formValue, username: e.target.value })
                    }
                    required
                />
                <span className="block text-text_color3 text-base font-semibold mt-6">
                    Password :
                </span>
                <input
                    type="password"
                    className="text-text_color2 bg-input_back w-full px-5 py-2 rounded-md mt-3 outline-none border-solid border-2 border-input_back focus:border-green"
                    placeholder="Enter your password"
                    value={formValue.password}
                    onChange={(e) =>
                        setFormValue({ ...formValue, password: e.target.value })
                    }
                    required
                />
                <button
                    type="submit"
                    className="text-text_color3 w-full bg-green mt-8 py-2 rounded-md hover:opacity-90"
                >
                    {authLoading ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin"
                        />
                    ) : (
                        "Log In"
                    )}
                </button>
                <div className="text-text_color2 text-center mt-4">
                    Don't have an account ?{" "}
                    <Link
                        to={"../register"}
                        className="text-green font-semibold underline"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Login;
