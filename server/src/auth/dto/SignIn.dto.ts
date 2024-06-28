import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
