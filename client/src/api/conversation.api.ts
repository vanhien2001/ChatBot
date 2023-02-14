import axiosClient from "./axiosClient";

export interface IConversationData {
    _id?: string;
    userId: string;
    name: string;
}

const conversationApi = {
    getAll: ( userId: string ) => {
        return axiosClient.get("/conversation", { params: { userId } });
    },

    get: (id: string) => {
        return axiosClient.get(`/conversation/${id}`);
    },

    add: (data: IConversationData) => {
        return axiosClient.post(`/conversation/store`, data);
    },

    edit: (id: string, data: IConversationData) => {
        return axiosClient.put(`/conversation/${id}`, data);
    },

    delete: (id: string) => {
        return axiosClient.delete(`/conversation/${id}`);
    },
};

export default conversationApi;
