import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/schemas/user.entity'

export class LoginResDto {
  @ApiProperty()
  message: string
  @ApiProperty()
  data: UserTokenDto
}

export class RegisterResDto {
  @ApiProperty()
  message: string
  @ApiProperty()
  data: StatusMessageDto
}

export class UserTokenDto {
  @ApiProperty()
  user: User
  @ApiProperty()
  accessToken: string
}

export class JwtGetUserDto {
  @ApiProperty()
  message: string
  @ApiProperty()
  data: User
}

export class StatusMessageDto {
  @ApiProperty()
  status: string
}

export class ResMessageDto {
  @ApiProperty()
  message: string
}

export class FullMessageDto {
  @ApiProperty()
  message: string
  @ApiProperty()
  status: number
}
