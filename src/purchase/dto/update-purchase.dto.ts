import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePurchaseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  category_id: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  product: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  quantity: number;
}