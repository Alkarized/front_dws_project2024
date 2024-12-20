import {createContext, useContext, useMemo, useState} from 'react';
import {useLocalStorage} from "./useLocalStorage";
import {authUser, registerUser} from "../../api/SegmentApi";
import {notifyError, notifyInfo, notifySuccess} from "../../toast/Notifies";

const AuthContext = createContext({user: null, login: null, logout: null, register: null});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);

    const register = async (data, navigate, addr) => {
        registerUser(data).then((e)=>{
            setUser(e.data.token)
            navigate(addr)
            notifySuccess("Вы успешно зарегистрировались")
        }).catch(_ => {
            notifyError("Не удалось зарегестрировать пользователя");
        })
    };

    const login = async (data, navigate, addr) => {
        authUser(data).then((e)=>{
            setUser(e.data.token)
            navigate(addr)
            notifySuccess("Вы успешно вошли")
        }).catch(_ => {
            notifyError("Данные пользователя не найдены");
        })
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            register,
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};