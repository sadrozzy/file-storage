import $api from "@/app/api/http";
import {AxiosResponse} from "axios";
import {IAuthResponse} from "@/app/api/models/response/IAuthResponse";

interface IUserSignIn {
    username: string;
    password: string;
}

interface IUserSignUp {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export default class AuthService {
    static async signin(user: IUserSignIn): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/signin', {
            username: user.username,
            password: user.password
        })
    }

    static async signup(user: IUserSignUp): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/signup', {
            username: user.username,
            email: user.email,
            fullname: `${user.firstName} ${user.lastName}`,
            password: user.password,
        })
    }

    static async logout(): Promise<void> {
        return $api.post('/api/auth/logout')
    }
}