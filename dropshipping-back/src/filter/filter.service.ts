import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model, SortOrder } from 'mongoose';
import { FilterDocument } from './schema/filter.schema';

@Injectable()
export class FilterService {
constructor(@InjectModel('book') private pageModel : Model <FilterDocument>) {
console.log('filter is on :', pageModel.modelName);
}

async movePage( genre: string ,page: number, limit: number, sort:string) {
const skip = (page -1) * limit
const pagination = genre ? {genre} : {}
const sortOrder: { [key: string]: SortOrder } = sort === 'asc' ? { price: 1 } : { price: -1 };
const [books,total] = await Promise.all ([
this.pageModel.find(pagination).sort(sortOrder).skip(skip).limit(limit).exec(),
this.pageModel.countDocuments(pagination).exec(),
])
return {books,total}
}



async filterDiscount(discount: boolean) {
return this.pageModel.find({discount}).exec()
}

async getFilterBooks (page:number, limit:number, sort:string, discount:boolean  ) {
const query : {discount?: boolean} = discount !== undefined ? {discount} : {};
const sortOrder: { [key: string]: SortOrder } = sort === 'asc' ? { price: 1 } : { price: -1 };
const skip = (page - 1) * limit;
return this.pageModel.find(query).sort(sortOrder).skip(skip).limit(limit).exec();


}

}