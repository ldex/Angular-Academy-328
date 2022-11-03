import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  insertForm: FormGroup;
  name: FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  onSubmit() {
    let newProduct: Product = this.insertForm.value;
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        product => {
          console.log('Product saved on server with id: ' + product.id);
          this.router.navigateByUrl('/products');
        },
        error => {
          console.error('Could not save the product, error: ' + error.message);
          this.router.navigateByUrl('/error');
        }
      )
  }

  ngOnInit() {
    let validImgUrlRegex: string = '^(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,5}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$';

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.description = new FormControl('', [Validators.minLength(5), Validators.maxLength(100)]);
    this.price = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.imageUrl = new FormControl('', [Validators.pattern(validImgUrlRegex)]);

    this.insertForm = this.fb.group(
      {
        name: this.name,
        price: this.price,
        description: this.description,
        imageUrl: this.imageUrl,
        discontinued: [false],
        fixedPrice: [false],
        modifiedDate: [null]
      }
    );
  }

}
