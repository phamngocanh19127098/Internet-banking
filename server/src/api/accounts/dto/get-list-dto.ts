import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetListDto{

    @ApiProperty()
    @IsNumberString()
    page:number;

    @ApiProperty()
    @IsNumberString()
    perPage:number;
}