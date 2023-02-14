import axiosClient from "./axiosClient";

export interface IUserData {
    _id?: string;
    username: string;
    password: string;
    name?: string;
    newPassword?: string;
}

const userApi = {
    load: () => {
        return axiosClient.get("user/load");
    },

    login: (data: IUserData) => {
        return axiosClient.post(`user/login`, data);
    },

    register: (data: IUserData) => {
        return axiosClient.post(`user/register`, data);
    },

    changePass: (data: IUserData) => {
        return axiosClient.post(`user/changePass`, data);
    },

    changeInfor: (data: string) => {
        return axiosClient.post(`user/changeInfor`, data);
    },
};

export default userApi;
