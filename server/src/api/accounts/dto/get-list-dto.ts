import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetListDto{

    @ApiProperty()
    @IsNumber()
    page:number;

    @ApiProperty()
    @IsNumber()
    perPage:number;

    @ApiProperty()
    sort?:string;
    
    @ApiProperty()
    fullTextSearch?:string;
}