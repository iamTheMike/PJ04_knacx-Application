import { IsString, MinLength } from 'class-validator';

// Define the data that will be sent to the controller
export class RegisterDto {
  @IsString({ message: 'email must be a string' })
  readonly email: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  readonly password: string;

  @IsString({ message: 'name must be a string' })
  @MinLength(4, { message: 'name must be at least 6 characters long' })
  readonly name: string;
}
