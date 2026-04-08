import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  colour: string;

  @IsString()
  @IsNotEmpty()
  weight: string;
}
