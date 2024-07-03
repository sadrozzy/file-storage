import {create} from "zustand"
import AuthService from "@/app/api/services/AuthService";
import {AxiosResponse} from "axios";
import {IAuthResponse} from "@/app/api/models/response/IAuthResponse";
import IUserSignUp from "@/app/api/models/user/IUserSignUp";
import IUserLogIn from "@/app/api/models/user/IUserLogIn";
import IUser from "@/app/api/models/user/IUser";


interface IStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: IUserLogIn) => Promise<void>;
    signup: (user: IUserSignUp) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const useStore = create<IStore>((set) => ({
    user: null,
    setUser: (user: IUser) => set({user}),
    isAuthenticated: false,
    isLoading: false,

    login: async (user: IUserLogIn) => {
        try {
            const response: AxiosResponse<IAuthResponse> = await AuthService.login(user)

            localStorage.setItem('token', response.data.tokens.accessToken);
            console.log(response.data)
            set({user: response.data.user, isAuthenticated: true})
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data);
        }

    },
    signup: async (user: IUserSignUp) => {
        try {
            const response = await AuthService.signup(user);
            localStorage.setItem('token', response.data.tokens.accessToken);
            console.log(response.data)
            set({user: response.data.user, isAuthenticated: true})
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data);
        }
    },
    logout: async () => {
        console.log("sadasdsa")
        localStorage.removeItem('token');
        set({user: null, isAuthenticated: false})

        try {
            const response = await AuthService.logout();
            console.log(response)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data);
        }
    },
    checkAuth: async () => {
        set({isLoading: true})
        try {
            const response = await AuthService.refresh();
            set({isAuthenticated: true})
            localStorage.setItem("token", response.data.tokens.accessToken);
            console.log(response)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data);
        } finally {
            set({isLoading: false})
        }
    },
}))

export default useStore