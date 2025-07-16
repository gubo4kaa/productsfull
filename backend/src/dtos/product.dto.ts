import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
    article!: string;

  @IsNotEmpty()
    name!: string;

  @IsNumber()
    @Min(0.01)
    price!: number;

  @IsNumber()
    @Min(0)
    quantity!: number;
}