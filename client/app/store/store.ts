import {create} from "zustand"
import AuthService from "@/app/api/services/AuthService";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    setUser: (user: User) => void;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const useStore = create((set) => ({
    user: null,
    setUser: (user: User) => set({user}),
    isAuthenticated: false,
    // checkAuthentication: async () => {
    //     const response =
    // },
    signin: async (user: User) => {
        try {
            const response = await AuthService.signin(user);
            localStorage.setItem('token', response.data.access_token);
            console.log(response.data)
            set({user: response.data.user, isAuthenticated: true})
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data);
        }

    },
    signup: async (user: User) => {
        try {
            const response = await AuthService.signup(user);
            localStorage.setItem('token', response.data.access_token);
            set({user: response.data.user, isAuthenticated: true})
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data);
        }
    },
    logout: async () => set({user: null, isAuthenticated: false}),
}))

export default useStore