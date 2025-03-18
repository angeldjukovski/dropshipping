import { Book } from "./book.interface";
import { Delivery} from "./delivery.interface";
import { User } from "./user.interface";

export interface Orders {
id:string
sub:string
bookID: Book
userID: User
DeliveryID : Delivery

}