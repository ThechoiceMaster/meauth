import { ApiProperty } from '@nestjs/swagger'

export class LoginLocalDto {
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
}

export class RegisterLocalDto {
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
}

export class ApproveUserDto {
  @ApiProperty()
  token: string
}

export class ForgotPasswordDto {
  @ApiProperty()
  email: string
}

export class confirmPasswordDto {
  @ApiProperty()
  password: string
}
