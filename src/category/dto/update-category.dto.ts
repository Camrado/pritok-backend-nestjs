import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  category_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  description: string;
}