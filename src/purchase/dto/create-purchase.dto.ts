import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePurchaseDto {
  @IsNumber()
  category_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  product: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}