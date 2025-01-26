import { IsNotEmpty, IsString, MinLength } from 'class-validator';

// Define the data that will be sent to the controller
export class RegisterUserDto {
  @IsString({ message: 'email must be a string' })
  @IsNotEmpty({ message: 'cannot empty' })
  readonly email: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'cannot empty' })
  readonly password: string;

  @IsString({ message: 'name must be a string' })
  @MinLength(4, { message: 'name must be at least 6 characters long' })
  @IsNotEmpty({ message: 'cannot empty' })
  readonly name: string;
}
