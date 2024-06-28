import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
