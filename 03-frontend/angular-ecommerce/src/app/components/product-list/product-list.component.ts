import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  updatePageSize(updatedPageSize: string) {
    this.pageSize = +updatedPageSize;
    this.pageNumber = 1;
    this.listProducts();
  }
  
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } 
    else {
      this.handleListProducts();
    }
  }
  
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get("keyword")!;

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    console.log(`keyword=${keyword}, pageNumber=${this.pageNumber}`);

    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword).subscribe(data => this.processResult(data));
  }

  handleListProducts() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCaregoryId=${this.currentCategoryId}, pageNumer=${this.pageNumber}`);

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(data => this.processResult(data));
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: productName=${product.name}, price=${product.unitPrice}`);

    this.cartService.addToCart(new CartItem(product));
  }

  private processResult(data: any) {
    this.products = data._embedded.products;
    this.pageNumber = data.page.number + 1;
    this.pageSize = data.page.size;
    this.totalElements = data.page.totalElements;
  }
}
