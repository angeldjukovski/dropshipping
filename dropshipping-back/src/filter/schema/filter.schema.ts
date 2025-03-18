import { Schema } from "mongoose";
import { Sort } from "./filter.enum";

export const FilterSchema = new Schema({
  page: { type: Number, required: false },
  limit: { type: Number, required: false },
  sort: { type: String, enum:["price-asc","price-desc"], required: false },
  discount: { type: Boolean, required: false },
});

export interface FilterBack {
    page?: number;
    limit?: number;
    sort?: Sort;
    discount?: boolean;
}

export interface FilterDocument extends FilterBack, Document {}