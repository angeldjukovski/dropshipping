import { ApiPropertyOptional,PartialType } from "@nestjs/swagger";
import { CreateCostumerDTO } from "./create-costumer.dto";
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateCostumerDTO extends PartialType(CreateCostumerDTO) {
@IsOptional()
@IsUUID()
@ApiPropertyOptional()
userID ? : string
}