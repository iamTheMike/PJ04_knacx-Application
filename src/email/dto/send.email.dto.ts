import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {

    @ApiProperty({
        description: 'List of email recipients',
        example: ['example1@mail.com', 'example2@mail.com'],
    })
    @IsEmail({}, { each: true })
    recipients: string[];

    @ApiProperty({
        description: 'Subject of the email',
        example: 'Welcome to Our Service',
    })
    @IsString()
    subject: string;

    @ApiProperty({
        description: 'HTML content of the email',
        example: '<h1>Hello, Welcome!</h1>',
    })
    @IsString()
    html: string;

    @ApiPropertyOptional({
        description: 'Plain text content of the email (optional)',
        example: 'Hello, Welcome!',
    })
    @IsOptional()
    @IsString()
    text?: string;
}
