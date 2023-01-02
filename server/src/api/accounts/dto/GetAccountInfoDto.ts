import {Allow, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class GetAccountInfoDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @Allow()
  bankDesId: number;
}