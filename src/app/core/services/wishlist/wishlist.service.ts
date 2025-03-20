import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private  PlatformService = inject(PlatformService)

  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();
  
  constructor(private http: HttpClient) {
    if (this.PlatformService.cheekplatform()) {
    if (localStorage.getItem('userToken')) {  
      this.loadInitialWishlist(); 
    }
  }
  }

  private loadInitialWishlist() {
    this.getWishApi().subscribe();
  }
  
  getWishApi(): Observable<any> {
    return this.http.get<any>(`${inv.baseurl}/api/v1/wishlist`).pipe(
      tap((res) => this.wishlistSubject.next(res.data)) 
    );
  }
  
  addToWishApi(pid: string): Observable<any> {
    return this.http.post<any>(`${inv.baseurl}/api/v1/wishlist`, { productId: pid }).pipe(
      tap((res) => {
        
        this.wishlistSubject.next([...this.wishlistSubject.value, res.data]);
      })
    );
  }
  
  deleteWishApi(pid: string): Observable<any> {
    return this.http.delete<any>(`${inv.baseurl}/api/v1/wishlist/${pid}`).pipe(
      tap(() => {
      
        this.wishlistSubject.next(this.wishlistSubject.value.filter(item => item._id !== pid));
      })
    );
  }
  

}

