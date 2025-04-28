import { Component,Input,Output,EventEmitter,ViewChild,AfterViewInit,OnChanges,SimpleChanges, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { Sort } from "../../types/sort.enum";

@Component ({
selector: 'app-pagination',
standalone: true,
imports : [MatPaginatorModule,CommonModule],
templateUrl : './pagination.component.html',
styleUrl: './pagination.component.scss'
})

export class PaginationComponent implements OnChanges, AfterViewInit {
@Input() currentPage : number = 1
@Input() pageSize : number = 10
@Input() totalItems : number = 100
@Input() sortOrder : Sort = Sort.Asc
@Output() pageChange = new EventEmitter<{page:number; pageSize: number; sort:Sort}>() 


@ViewChild(MatPaginator) paginator! : MatPaginator 

Sort = Sort

constructor()  {}

ngOnChanges(changes: SimpleChanges): void {
 if(this.paginator)  {
 if(changes['totalItems'] || changes['pageSize']) {
  this.paginator.length = this.totalItems;
  this.paginator.pageSize = this.pageSize;
 }
 }
}

ngAfterViewInit(): void {
 if(this.paginator) {
 this.paginator.page.subscribe((event:PageEvent) => this.changePage(event))
 }
}

changePage(event:PageEvent) : void {
this.currentPage = event.pageIndex +1
this.pageSize = event.pageSize
this.pageChange.emit({
  page: event.pageIndex + 1,
  pageSize: event.pageSize,
  sort: this.sortOrder
})
}

changeSort(event:Event) : void {
const selectElement = event.target as HTMLSelectElement
if(selectElement) {
  const sortOrder = selectElement.value 
  this.sortOrder = sortOrder === 'asc' ? Sort.Asc : Sort.Desc
  this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize, sort: this.sortOrder });
}
}





}
