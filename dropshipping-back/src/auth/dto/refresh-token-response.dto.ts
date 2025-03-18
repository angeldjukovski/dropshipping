import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDtoResponse {
@ApiProperty({description: 'Token of the user'})
token:string

@ApiProperty({description: 'Refresh token of the user'})
refreshToken:string

}