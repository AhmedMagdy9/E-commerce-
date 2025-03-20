
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountNumService {

 


  cartNum:BehaviorSubject<number> = new BehaviorSubject(0)


  
  

}
