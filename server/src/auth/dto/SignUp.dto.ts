import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty({ example: "admin" })
    @Min(3)
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: "info@site.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "Вася Птичкин" })
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty({ example: "123123" })
    @IsNotEmpty()
    @Min(4)
    password: string;
}
