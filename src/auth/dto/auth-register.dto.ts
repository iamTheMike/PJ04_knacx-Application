import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class RegisterUserDto {

  @ApiProperty({
    description: "The User Email must be email type",
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'cannot empty' })
  readonly email: string;

  @ApiProperty({
    description: "The Password ",
    required: true,
    example: 'password123'
  })
  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'cannot empty' })
  readonly password: string;

  @ApiProperty({
    description: "The Username",
    required: true,
  })
  @IsString({ message: 'name must be a string' })
  @MinLength(4, { message: 'name must be at least 6 characters long' })
  @IsNotEmpty({ message: 'cannot empty' })
  readonly name: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'User email', example: 'user@example.com',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User password', example: 'password123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}


