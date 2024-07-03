import IUser from "@/app/api/models/user/IUser";

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthResponse {
    user: IUser;
    tokens: ITokens;
}