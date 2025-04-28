import {IsOptional, IsUUID} from "class-validator"
import { CreateBookDTO } from "./book.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdateBookDTO extends PartialType(CreateBookDTO) {
@IsOptional()
id?:string
}