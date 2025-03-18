import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
@ApiProperty ({description: 'Refresh token of the user'})
refreshToken : string
}