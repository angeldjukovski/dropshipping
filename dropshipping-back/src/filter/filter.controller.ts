import { Controller, Query, Get, Param, BadRequestException } from '@nestjs/common';
import { FilterService } from './filter.service';

@Controller('book-db/genre')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get(':genre/page')
  async movePage(@Param ('genre') genre:string, @Query('page') page: string, @Query('limit') limit: string, @Query('sort') sort:string) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10

    if (!Number.isInteger(limitNum) || !Number.isInteger(limitNum) || pageNum < 1 || limitNum < 1) {
      throw new BadRequestException('Invalid page or limit. Both must be positive integers.');
    }
    if (sort !== 'asc' && sort !== 'desc') {
      sort = 'asc'
    
    }

    const {books,total} = await this.filterService.movePage(genre,pageNum, limitNum, sort )
    return {books,total}
   
  }

  

  @Get()
  async filterDiscount(@Query('discount') discount: string) {
    if (discount !== 'true' && discount !== 'false') {
      throw new BadRequestException('Invalid discount parameter. Use "true" or "false".');
    }

    const isDiscount = discount === 'true';
    return this.filterService.filterDiscount(isDiscount);
  }

  @Get('genre/filter')
  async getFilterBooks(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sort') sort: string,
    @Query('discount') discount: string
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (!Number.isInteger(pageNum) || !Number.isInteger(limitNum) || pageNum < 1 || limitNum < 1) {
      throw new BadRequestException('Invalid page or limit. Both must be positive integers.');
    }

    if (sort !== 'asc' && sort !== 'desc') {
      throw new BadRequestException('Invalid sort parameter. Use "asc" or "desc".');
    }

    if (discount !== 'true' && discount !== 'false') {
      throw new BadRequestException('Invalid discount parameter. Use "true" or "false".');
    }

    const isDiscount = discount === 'true';
    return this.filterService.getFilterBooks(pageNum, limitNum, sort, isDiscount);
  }
}
