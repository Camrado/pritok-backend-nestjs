import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangeUsernameDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;
}