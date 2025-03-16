import { IsString, IsDate, IsNumber } from "class-validator";
export class UserDTO{
    @IsNumber()
    id: number
    @IsString()
    userDocument: string
    @IsString()
    creditCardToken: string
    @IsNumber()
    Value: number
}