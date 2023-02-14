import axiosClient from "./axiosClient";

export interface IMessageData {
    _id?: string;
    conversationId: string;
    bot: Boolean;
    text: string;
    createdAt?: string;
}

const messageApi = {
    getAll: (conversationId: string) => {
        return axiosClient.get("/message", { params: { conversationId } });
    },

    get: (id: string) => {
        return axiosClient.get(`/message/${id}`);
    },

    add: (data: IMessageData) => {
        return axiosClient.post(`/message/store`, data);
    },

    requestBot: (data: IMessageData) => {
        return axiosClient.post(`/message/botReponse`, data);
    },

    edit: (id: string, data: IMessageData) => {
        return axiosClient.put(`/message/${id}`, data);
    },

    delete: (id: string) => {
        return axiosClient.delete(`/message/${id}`);
    },
};

export default messageApi;
