import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    maxItemsPerPage: number = 10;       // binding en el select
    buttonsForPages: number = 1;
    pagesQuantity: number[] = [];
    searchTerm: string = "";
    selectedPage:number = 0;
    items: any[] = [];
    minRange: number = 1;
    maxRange: number = 10;
    loading: boolean = false;

    constructor(private productsService: ProductsService) {}

    calcButtonsForPages(): void {
        this.buttonsForPages = Math.ceil(this.items.length / this.maxItemsPerPage);
        
        this.pagesQuantity = [].constructor(this.buttonsForPages);
        this.onSelectPage(this.selectedPage);
    }

    onSelectPage(page: number) {
        if (page === 0) {
            this.maxRange = 1;
            this.minRange = this.maxItemsPerPage;
        }
        if (page > this.buttonsForPages) {page = 0;}

        this.selectedPage = page;
        this.maxRange = this.maxItemsPerPage * (this.selectedPage+1);
        this.minRange = (this.maxRange+1) - this.maxItemsPerPage;
    }

    getProducts() {
        this.productsService.getProducts().subscribe({
            next: (res: any[]) => {
                this.items = res;
                this.calcButtonsForPages();
            },
            error: (err) => console.error(err),
        });
    }

    ngOnInit(): void { 
        this.getProducts(); 
        this.onSelectPage(this.selectedPage);
    }

}
