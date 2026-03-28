import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount = signal<number>(0);
  private readonly httpClient=inject(HttpClient)
  addToCart(productId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+ "/api/v2/cart", {
      productId: productId,
    })}
  getAllCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+ "/api/v2/cart")
  }
  removeProduct(productId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+ `/api/v2/cart/${productId}`)

  }
  updateCart(productId:string,count:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+ `/api/v2/cart/${productId}`, {
      "count": count
    })
  }
    clearCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl+ `/api/v2/cart`)
  }

    cashOrder(cartId:string,data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+ `/api/v2/orders/${cartId}`,data)
  }
     visaOrder(cartId:string,data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+ `/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,
      data)
  }

}
