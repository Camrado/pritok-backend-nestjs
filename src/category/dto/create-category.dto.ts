import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  category_name: string;

  @IsString()
  @MaxLength(300)
  description: string;
}