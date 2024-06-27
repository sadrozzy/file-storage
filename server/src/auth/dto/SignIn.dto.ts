import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty({ example: "admin" })
    @Min(3)
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: "info@site.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "123123" })
    @IsNotEmpty()
    password: string;
}
