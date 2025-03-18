import { Controller,Get,Delete,Patch,Post,Body,Param,UseGuards,Query, BadRequestException, NotFoundException} from '@nestjs/common';
import { ApiTags,ApiOkResponse,ApiOperation,ApiCreatedResponse,ApiBadRequestResponse,ApiBearerAuth, ApiNotFoundResponse } from '@nestjs/swagger';
import { CostumerService } from './costumer.service';
import { UpdateCostumerDTO } from './dto/update.dto';
import { SearchQueryDTO } from './dto/search-query-dto';
import { Role } from 'common/decorator/role.decorator.decorator';
import { RoleValidatorType } from 'common/type/role.validator.enum';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guards';
import { RolesGuard } from 'common/guard/role.guard';
import { CostumerDocument } from './schema/costumer.schema';
import { CostumerBack } from './schema/costumer.schema';
import { UserRole } from 'user/schema/user-role.enum';
import { CreateCostumerDTO } from './dto/create-costumer.dto';
import { Response } from 'common/type/response.interface';
;


@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@ApiTags('Costumer')
@Controller('users')
export class CostumerController {
constructor(private readonly costumerService: CostumerService) {}


@ApiCreatedResponse({ description: 'New costumer has been created' })
@ApiBadRequestResponse({description: "invalid input", type: BadRequestException})
@Role([UserRole.Costumer])
@Post()
createCostumer (@Body() createCostumerDTO : CreateCostumerDTO) {
return this.costumerService.createCostumer(createCostumerDTO)
}
@ApiOperation({description: "Find all costumers",})
@ApiOkResponse({ description: 'List of costumers' })
@ApiBadRequestResponse({description: "Not guests found", type: BadRequestException})
@Role([UserRole.Costumer,UserRole.Admin])
@Get()
 async findall(@Query() searchQueryDTO : SearchQueryDTO): Promise<Response<CostumerDocument[]>> {
return this.costumerService.findAll(searchQueryDTO).then(costumers => ({
payload: costumers,
total: costumers.length
}));
}
@ApiOperation({description: "Find a costumer from his id",})
@ApiOkResponse({ description: 'Costumer retrieved successfully' })
@ApiNotFoundResponse({description: 'costumer not found'})
@Role([UserRole.Costumer,UserRole.Admin, UserRole.Employee])
@Get()
async getById (@Param() id:string):Promise <CostumerDocument>  {
return this.costumerService.getById(id)
}
@ApiOperation({ description: 'Update a costumer' })
@ApiOkResponse({ description: 'Costumer updated successfully' })
@ApiNotFoundResponse({ description: 'Costumer not found', type: NotFoundException })
@Patch("id")
update(@Param('id') id:string, @Body() updateCostumerDTO : UpdateCostumerDTO):Promise <CostumerDocument> {
return  this.costumerService.update(id,updateCostumerDTO)
}

@ApiOperation({ description: 'Delete a costumer' })
@ApiOkResponse({ description: 'Costumer deleted successfully' })
@ApiNotFoundResponse({ description: 'Costumer not found', type: NotFoundException })
@Delete("id")
delete(@Param('id') id:string, ):Promise <CostumerDocument>  {
return this.costumerService.delete(id)
}


}
