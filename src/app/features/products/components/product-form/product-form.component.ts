import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/features/categories/models/category';
import { Products } from 'src/app/features/products/models/products';
import { ProductsService } from 'src/app/features/products/services/products.service';
import { Supplier } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productToUpdate: Products | null = null;
  categories:Category[]=[];
  suppliers:Supplier[]=[];
  get isEditting(): boolean {
    return this.productToUpdate !== null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService:CategoriesService,
    private suppliersService:SuppliersService,
  ) {
    // this.productForm = new FormGroup({
    //   name: new FormControl(''),
    // });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getSuppliers();
    this.createProductForm();
    this.getProductIdFromRoute();
  }
  getSuppliers() {
    this.suppliersService.getList().subscribe((response:Supplier[])=>
    this.suppliers=response)
  }
  getCategories() {
    this.categoriesService.getList().subscribe((response:Category[])=>{
    this.categories=response;
  });
  }

  createProductForm(): void {
    this.productForm = this.formBuilder.group({
      supplierId: [0, Validators.min(1)],
      categoryId: [0, Validators.min(1)],
      quantityPerUnit: ['', Validators.required],
      unitPrice: [0, Validators.min(0)],
      unitsInStock: [0, Validators.min(0)],
      unitsOnOrder: ['', Validators.min(0)],
      reorderLevel: ['', Validators.min(0)],
      discontinued: [false],
      name: ['', [Validators.required, Validators.minLength(2)]], //: array, form control'??n parametrelerini temsil eder. 1. eleman default de??er, 2. eleman validators
    });
  }

  getProductIdFromRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['productId']) this.getProductById(params['productId']);
    });
  }

  getProductById(productId: number) {
    this.productsService.getById(productId).subscribe({
      next: (response) => {
        this.productToUpdate = response;
        this.productForm.patchValue(this.productToUpdate); //: Formun i??ine productToUpdate modelini doldurur.
      },
      error: () => {
        this.toastrService.error('Product not found');
        this.router.navigate(['/dashboard', 'products']);
      },
    });
  }

  onProductFormSubmit(): void {
    if (this.productForm.invalid) {
      this.toastrService.error('Please fill in the form correctly');
      return;
    }

    if (this.isEditting) this.update();
    else this.add();
  }

  onDeleteProduct(): void {
    if (confirm('Are you sure you want to delete this product?') === false)
      return;

    this.delete();
  }

  add(): void {
    const request: Products = {
      //: Backend'in product add endpoint'ine g??nderilecek olan request modeli.
      ...this.productForm.value,
      categoryId: Number(this.productForm.value.categoryId),
      supplierId:Number(this.productForm.value.supplierId),
      name: this.productForm.value.name.trim(), //= ...this.productForm.value ile gelen 'name' de??erinin ??zerin tekrar yaz??yoruz (overwrite).
    };

    this.productsService.add(request).subscribe((response) => {
      this.toastrService.success('Product added successfully');
      this.router.navigate(['/dashboard', 'products', 'edit', response.id]);
    });
  }

  update(): void {
    const request: Products = {
      id: this.productToUpdate!.id,
      categoryId: Number.parseInt(this.productForm.value.categoryId),
      supplierId: Number.parseInt(this.productForm.value.supplierId),
      quantityPerUnit: this.productForm.value.quantityPerUnit,
      unitPrice: Number.parseFloat(this.productForm.value.unitPrice),
      unitsInStock: Number.parseInt(this.productForm.value.unitsInStock),
      unitsOnOrder: Number.parseInt(this.productForm.value.unitsOnOrder),
      reorderLevel: Number.parseInt(this.productForm.value.reorderLevel),
      discontinued: Boolean(this.productForm.value.discontinued),
      name: this.productForm.value.name.trim(),
    };

    this.productsService.update(request).subscribe((response) => {
      this.productToUpdate = response;
      this.toastrService.success('Product updated successfully');
    });
  }

  delete(): void {
    this.productsService.delete(this.productToUpdate!.id).subscribe(() => {
      this.toastrService.success('Product deleted successfully');
      this.router.navigate(['/dashboard', 'products']);
    });
  }
}