import { Type } from "class-transformer";
import { IsArray, IsInt,  IsNotEmpty, ValidateNested} from "class-validator";


export class CreateOrderItemDto {

    @IsInt({message: 'Quantity description must be a number' })
    @IsNotEmpty({ message: 'cannot empty' })
    readonly productId : number ;
    
    @IsInt({message: 'Quantity description must be a number' })
    @IsNotEmpty({ message: 'cannot empty' })
    readonly quantity : number;

    @IsInt({message: 'Price description must be a number'})
    @IsNotEmpty({ message: 'cannot empty' })
    readonly price: number ;
    
    
}

export class CreateOrderDto {
    @IsNotEmpty()
    customerName: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
  }