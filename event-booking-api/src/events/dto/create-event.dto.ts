import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsNumber()
  @IsPositive()
  price!: number;
}
