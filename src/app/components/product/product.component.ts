import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { PRODUCTS } from 'src/app/utilities/data';
import { environment } from 'src/environments/environment';
import { Cart, PriceView } from 'src/app/interfaces/cart.interface';
import { convertToWPValue } from 'src/app/utilities/helper';
import * as _ from 'lodash';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild('qtySelector') qtySelector!: ElementRef | undefined;
  @ViewChildren('attrBtn') attrBtn!: any | ElementRef;
  private _price: any;
  product!: Partial<Product>;
  siteConfig = environment;
  lineItem!: Cart;
  quantity: number = 1;
  successAddedToCart: boolean = false;
  removebtn = '';

  /**Price properties */
  productPrice = new Subject<PriceView>();
  productPrice$ = this.productPrice.asObservable();
  price!: string;
  onSale: boolean = false;

  /**Product Variations Properties */
  hasVariations: boolean = false;
  variations: any = {}; // WP Meta Data Object
  regular_price: string | undefined;
  sale_price: string | undefined;
  productAttributeLength = 0;
  productAttributeSelected: any = [];
  requireOptions = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CartService,
    private dom: Renderer2
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.productPriceObsvble();
    this.processRouteParams();
    this.addToCartConfirmObsvble();
  }

  addToCart(payload: any) {
    if (this.hasVariations) {
      if(!this.requireOptions){ alert('Please select a product option'); return }
      const variation = this.product.variation_data;
      variation?.forEach((v: any) => {
        if (v.id === this.lineItem.variation_id) {
          return;
        } else {
          this.cs.addToCart({
            item: this.lineItem,
            price: v.sale_price ?? v.price,
            qty: this.quantity,
            product: this.product,
          });
        }
      });
    } else {
      this.lineItem = {
        product_id: payload.id,
        quantity: this.quantity,
      };
      this.cs.addToCart({
        item: this.lineItem,
        price: this._price.sale_price ?? this._price.price,
        qty: this.quantity,
        product: this.product,
      });
    }

    this.resetAddToCart();
  }

  checkOptionsSelected() {
    if (this.productAttributeSelected.length === this.productAttributeLength) {
      this.requireOptions = true;
    } else {
      this.requireOptions = false;
    }
  }

  getAttributeOptions() {
    const variations = this.product.variation_data;
    const data: any = [];

    const findInArray = (currentValue: any, newValue: any) => {
      //console.log(`finding ${currentValue} ${newValue} `)
      return currentValue === newValue;
    };

    let i = 0;
    let iLen = variations?.length;
    if (iLen != undefined && variations) {
      for (i; i < iLen; i++) {
        for (let j = 0; j < variations[i].attributes.length; j++) {
          const index = data.findIndex((currentValue: any) =>
            findInArray(currentValue['name'], variations[i].attributes[j].name)
          );

          const value = variations[i].attributes[j].option.toLowerCase();
          if (index > -1) {
            let option = data[index].option;
            if (option.includes(value)) {
            } else {
              data[index].option.push(value);
            }
          } else {
            data.push({
              id: variations[i].attributes[j].id,
              name: variations[i].attributes[j].name,
              option: [value],
            });
          }
        }
      }
    }

    this.productAttributeLength = data.length;
    this.productAttributeSelected.push(data);
    return data;
  }

  getStockByAttribute(attr: string, value: string, hover = true) {
    const variations: any = this.product.variation_data?.filter((f) => {
      return f.stock_status !== 'instock';
    });
    console.log(variations);
    this.attrBtn.find((c: any) => {
      if (c.nativeElement.dataset.valueId === value.toLocaleLowerCase()) {
        if (!hover) {
          console.log(hover);
          this.dom.removeAttribute(c.nativeElement, 'disabled');
        } else {
          console.log(hover);
          this.dom.setAttribute(c.nativeElement, 'disabled', 'true');
        }
      }
    });

    // variations.map((v: any) => {
    //   v.attributes.forEach((l: any) => {
    //     const optionValue = l.option.toLowerCase();
    //     if (optionValue !== value) {
    //       this.attrBtn.find((b: any) => {
    //         this.dom.removeAttribute(b.nativeElement, 'disabled');
    //         const el = b.nativeElement.dataset.valueId === optionValue;
    //         if (b.nativeElement.dataset.valueId === optionValue) {
    //           console.log(b.nativeElement.dataset.valueId, optionValue);
    //           if (!hover) {
    //             this.dom.removeAttribute(b.nativeElement, 'disabled');
    //           } else {
    //             console.log('disable it', b.nativeElement);
    //             this.dom.setAttribute(b.nativeElement, 'disabled', 'true');
    //             const el = document.getElementById(
    //               `${optionValue}`
    //             ) as HTMLButtonElement;
    //             el.disabled = true;
    //             console.log(b.nativeElement);
    //           }
    //         }
    //       });
    //     }
    //   });
    // });
  }

  saveProductVariation(payload: any) {
    const variations = this.product.variation_data;
    let attrLenMatch =
      this.productAttributeSelected.length == this.productAttributeLength;
    const ignoreOrderCompare = (a: any, b: any) => {
      if (a.length !== b.length) return false;
      const elements = new Set([...a, ...b]);
      for (const x of elements) {
        const count1 = a.filter((e: any) => e === x).length;
        const count2 = a.filter((e: any) => e === x).length;
        if (count1 !== count2) return false;
      }
      return true;
    };

    const compareEntries = (payload?: any) => {
      let i = 0;
      let match = false;
      if (!payload) {
        for (i; i < variations!.length; i++) {
          if (
            ignoreOrderCompare(
              this.productAttributeSelected,
              variations![i].attribute
            )
          ) {
            if (variations![i] != undefined) {
              this.lineItem = {
                product_id: this.product.id,
                variation_id: variations![i].id,
                quantity: this.quantity,
              };
              this.setProductPrice({
                price: variations![i].price,
                regular_price: variations![i].regular_price,
                sale_price: variations![i].sale_price,
                qty: this.quantity,
              });
            }
            match = true;
          }
        }
      } else {
      }

      return match;
    };

    if (!attrLenMatch) {
      this.productAttributeSelected.push(payload);
      if (
        this.productAttributeSelected.length === this.productAttributeLength
      ) {
        compareEntries();
        this.checkOptionsSelected();
      } else {
        //do nothing
      }
    } else {
      if (!_.includes(this.productAttributeSelected, payload)) {
        this.productAttributeSelected = [];
        this.productAttributeSelected.push(payload);
        this.checkOptionsSelected();
      }
    }
  }

  productQtyChanged() {
    this.quantity = this.qtySelector?.nativeElement.value;
    this.setProductPrice();
  }

  resetAddToCart() {
    this.lineItem = {};
    this.quantity = 1;
    console.log('reset to cart', 1 * +this._price.price);
    if (this.product.price !== undefined) {
      this.productPrice.next({
        price: (this.quantity * +this.product?.price).toString(),
      });
    }
  }

  resetNotification() {
    this.successAddedToCart = false;
  }

  addToCartConfirmObsvble() {
    this.cs.successAddedToCart$.subscribe((confirm: boolean) => {
      console.log(confirm, this.successAddedToCart);
      confirm ? (this.successAddedToCart = confirm) : null;
    });
  }

  productPriceObsvble() {
    this.productPrice$.subscribe((price: PriceView) => {
      this._price = price;
      this.price = price.price;
      this.regular_price = price.regular_price ?? this.regular_price;
      this.sale_price = price.sale_price ?? this.sale_price;
    });
  }

  processRouteParams() {
    this.route.paramMap.subscribe((route) => {
      const slug = route.get('slug');
      const validateSlug = (slug: any, payload: any) => {
        if (typeof parseFloat(slug) === 'number' && payload.id === +slug) {
          return true;
        } else if (typeof slug === 'string' && payload.slug === slug) {
          return true;
        }
        return false;
      };

      if (slug) {
        //show product
        const data$: Observable<any> = of(PRODUCTS);
        data$
          .pipe(
            map((products: any) =>
              products.find((p: any) => {
                return validateSlug(slug, p);
              })
            )
          )
          .subscribe((data: any) => {
            if (data != undefined) {
              this.product = data;
              /**WP meta data variations object */
              if (data.type === 'variable') {
                this.hasVariations = true;
                this.variations = {};
                data.attributes.forEach((variation: any) => {
                  let name: string = variation.name;
                  this.variations[name] = {
                    key: `pa_${convertToWPValue(variation['name'])}`,
                    value: 'no value',
                  };
                });
              }
              data.on_sale ? (this.onSale = true) : false;
            }

            /**Product Price in View */
            this.setProductPrice({
              price: data.price,
              regular_price: !!data.on_sale ? data.regular_price : undefined,
              sale_price: !!data.on_sale ? data.sale_price : undefined,
              qty: 1,
            });
          });
      } else {
        //if the slug is null or empty redirect to 404 or somewhere else
        this.router.navigateByUrl('page-not-found');
      }
    });
  }

  setProductPrice(options?: {
    price: string;
    regular_price: string;
    sale_price: string;
    qty: number;
    variation_id?: number;
  }) {
    let currentProductPrice = 0.0;
    if (options !== undefined) {
      const listPrice = +options.regular_price;
      const salePrice = +options.sale_price;
      let calcPrice;

      if (salePrice > 0 && salePrice < listPrice) {
        if (options.qty != undefined) {
          calcPrice = (currentProductPrice + salePrice) * options.qty;
        } else {
          calcPrice = (currentProductPrice + salePrice) * this.quantity;
        }
        this.productPrice.next({
          price: calcPrice.toString(),
          regular_price: listPrice.toString(),
          sale_price: salePrice.toString(),
          onSale: this.onSale,
        });
      } else {
        this.productPrice.next({
          price: options.price,
          onSale: this.onSale,
        });
      }
    } else {
      let newPrice;
      //if (this.price.productPrice !== undefined) {
      console.log(this.quantity);
      if (this.product.regular_price) {
        if (this.product.sale_price !== undefined) {
          if (!!this.onSale) {
            newPrice = (+this.product.sale_price * this.quantity).toString();
            console.log('on sale: ', newPrice);
            // this.productPrice.next({
            //   price: newPrice,
            //   regular_price: this.regular_price,
            //   sale_price: this.sale_price,
            //   onSale: this.onSale
            // });
          } else {
            newPrice = (+this.product.regular_price * this.quantity).toString();
            console.log('regular price: ', newPrice);
          }
          this.productPrice.next({
            price: newPrice,
            regular_price: !!this.onSale
              ? this.product.regular_price
              : undefined,
            sale_price: !!this.onSale ? this.product.sale_price : undefined,
            onSale: this.onSale,
          });

          console.log({
            price: newPrice,
            regular_price: !!this.onSale
              ? this.product.regular_price
              : undefined,
            sale_price: !!this.onSale ? this.product.sale_price : undefined,
            onSale: this.onSale,
          });
        }
      } else {
        if (this.product.price?.length) {
          newPrice = +this.product.price * this.quantity;
          this.productPrice.next({
            price: newPrice.toString(),
          });
        }
      }
      //}
    }
  }
}
