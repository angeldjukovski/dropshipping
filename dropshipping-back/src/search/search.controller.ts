import { Get } from '@nestjs/common';
import { Controller, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchBookDTO } from './dto/search.dto';

@Controller('genre/search')
export class SearchController {
constructor(private readonly searchService:SearchService) {}

@Get()
async searchBooks(@Query() searchQuery:SearchBookDTO) {
return this.searchService.searchBooks(searchQuery)
}

}
