import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional,IsInt,Min, IsEnum, IsBoolean } from "class-validator/types";

export class FilterDTO {
    @ApiPropertyOptional({description: 'Page Number',default:1})
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;
    @ApiPropertyOptional({description: 'Numbers of Results',default:10})
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;
    @ApiPropertyOptional({description: 'Sort by Price',enum:["price-asc","price-desc"]})
    @IsOptional()
    @IsEnum(["price-asc","price-desc"])
    sort?: string;
    @ApiPropertyOptional({description: 'Discount',default:false})
    @IsOptional()
    @IsBoolean()
    discount?: boolean; 
}