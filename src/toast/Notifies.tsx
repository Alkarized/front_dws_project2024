import {toast} from "react-toastify";
import {Id, ToastContent, TypeOptions} from "react-toastify/dist/types";

export const notifyInfo = (text: String) => {
    toast(text, {type: "info"});
}

export const notifySuccess = (text: String) => {
    toast(text, {type: "success"});
}

export const notifyError = (text: String) => {
    toast(text, {type: "error"});
}

export const notifyLoading = (text : string) => {
    return toast.loading(text)
}

export const updateError = (id: Id, text : ToastContent) => {
    updateToast(id, text, "error")
}

export const updateSuccess = (id: Id, text : ToastContent) => {
    updateToast(id, text, "success")
}

const updateToast = (id : Id, text : ToastContent, type : TypeOptions) => {
    toast.update(id,
        {
            render: text,
            type: type,
            isLoading: false,
            autoClose : 1000,
            closeOnClick : true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable : true,
            pauseOnHover: true
        });
}