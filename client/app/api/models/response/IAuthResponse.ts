import IUser from "@/app/api/models/IUser";

export interface IAuthResponse {
    access_token: string;
    refresh_token: string;
    user: IUser
}