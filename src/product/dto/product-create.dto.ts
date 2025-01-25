import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString({ message: 'Product name must be a string' })
    readonly name: string;

    @IsOptional()
    @IsString({ message: 'Product description must be a string' })
    readonly description?: string ;  // ชนิดข้อมูลเป็น string หรือ null

    @IsInt({ message: 'Product price must be a number' })
    readonly price: number;

    @IsInt({ message: 'Product stock must be a number' })
    readonly stock: number;

    @IsOptional()
    @IsString({ message: 'Product image must be a string' }) // ตรวจสอบว่าเป็น null หรือ string
    readonly image?: string ;  // ชนิดข้อมูลเป็น string หรือ null
}
