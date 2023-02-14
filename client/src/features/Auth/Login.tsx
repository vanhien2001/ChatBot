import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { userSelector, login, load } from "../../store/reducers/userSlice";

interface IFormValue {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { authLoading } = useAppSelector(userSelector);
    const [formValue, setFormValue] = useState<IFormValue>({
        username: "",
        password: "",
    });

    const onSubmit = () => {
        dispatch(login(formValue)).then(() => dispatch(load()));
    }

    return (
        <>
            <div className="text-text_color2 text-center text-xl font-semibold mt-2">
                Sign In
            </div>
            <div className="w-1/2 mx-auto mt-10">
                <span className="block text-text_color2 text-base font-semibold">
                    Username :
                </span>
                <input
                    type="text"
                    className="text-text_color2 bg-input_back w-full px-5 py-2 rounded-md mt-3 outline-none border-solid border-2 border-input_back focus:border-green"
                    placeholder="Username"
                    value={formValue.username}
                    onChange={(e) =>
                        setFormValue({ ...formValue, username: e.target.value })
                    }
                />
                <span className="block text-text_color2 text-base font-semibold mt-6">
                    Password :
                </span>
                <input
                    type="password"
                    className="text-text_color2 bg-input_back w-full px-5 py-2 rounded-md mt-3 outline-none border-solid border-2 border-input_back focus:border-green"
                    placeholder="Password"
                    value={formValue.password}
                    onChange={(e) =>
                        setFormValue({ ...formValue, password: e.target.value })
                    }
                />
                <button className="w-full bg-green mt-8 py-2 rounded-md hover:opacity-90" onClick={onSubmit}>
                    {authLoading ? 'Loading...' : 'Log In'}
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
            </div>
        </>
    );
};

export default Login;
