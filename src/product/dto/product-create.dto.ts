import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString({ message: 'Product name must be a string' })
     @IsNotEmpty({ message: 'cannot empty' })
    readonly name: string;

    @IsOptional()
    @IsString({ message: 'Product description must be a string' })
    @IsNotEmpty({ message: 'cannot empty' })
    readonly description?: string ;  // ชนิดข้อมูลเป็น string หรือ null

    @IsInt({ message: 'Product price must be a number' })
    @IsNotEmpty({ message: 'cannot empty' })
    readonly price: number;

    @IsInt({ message: 'Product stock must be a number' })
    @IsNotEmpty({ message: 'cannot empty' })
    readonly stock: number;

    @IsOptional()
    @IsString({ message: 'Product image must be a string' }) // ตรวจสอบว่าเป็น null หรือ string
    @IsNotEmpty({ message: 'cannot empty' })
    readonly image?: string ;  // ชนิดข้อมูลเป็น string หรือ null
}

