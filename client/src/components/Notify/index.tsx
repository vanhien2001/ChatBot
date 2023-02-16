import React from "react";

export interface IData {
    data: {
        success: Boolean;
        messages: string;
    };
}

const Notify: React.FC<IData> = ({ data }) => {
    return (
        <div
            className={`notify fixed right-10 top-10 bg-bg_back px-5 py-1 text-text_color3 border-l-4 ${
                data.success ? "border-green" : "border-red"
            } border-solid shadow-sm shadow-text_color2`}
        >
            {data.messages}
        </div>
    );
};

export default Notify;
