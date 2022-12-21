import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RequestRefreshTokenDto {
    @IsString()
    @ApiProperty({default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjcxNjI4OTU3LCJleHAiOjE2Nzk0MDQ5NTd9.umWE2pVqClhuW3yP5WfRl5a7of7c2TkWp9aAjzC3His'})
    refreshToken : string;
}