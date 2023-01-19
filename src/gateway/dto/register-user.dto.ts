import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsDate()
    @IsNotEmpty()
    dob: Date;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}