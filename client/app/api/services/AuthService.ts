import $api from "@/app/api/http";
import {AxiosResponse} from "axios";
import {IAuthResponse} from "@/app/api/models/response/IAuthResponse";
import IUserLogIn from "@/app/api/models/user/IUserLogIn";
import IUserSignUp from "@/app/api/models/user/IUserSignUp";



export default class AuthService {
    static async login(user: IUserLogIn): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/login', {
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
        return $api.post('/auth/logout')
    }

    static async refresh() {
        return $api.get('/auth/refresh')
    }
}