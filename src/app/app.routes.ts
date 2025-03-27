import { urlGuardGuard } from './core/guards/authG/url-guard.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ProductComponent } from './features/pages/product/product.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { NotFoundComponent } from './features/layout/not-found/not-found.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { ProductDetilsComponent } from './features/pages/product-detils/product-detils.component';
import { CheckOutComponent } from './features/pages/check-out/check-out.component';
import { AllorderComponent } from './features/pages/allorder/allorder.component';
import { ProductcatComponent } from './features/pages/product-category/productcat/productcat.component';


export const routes: Routes = [
    {path:"" , redirectTo:"home" , pathMatch:"full"},
    {path:"home" , component:HomeComponent ,  title:'home'},
    {path:"productcat/:catid" , component:ProductcatComponent ,  title:'products category'},
    {path:"cart" , component:CartComponent , canActivate:[urlGuardGuard], title:'cart'},
    {path:"products" , component:ProductComponent , canActivate:[urlGuardGuard], title:'products'},
    {path:"Categories" , component:CategoriesComponent , canActivate:[urlGuardGuard], title:'Categories'},
    {path:"productdetils/:id" , component:ProductDetilsComponent , title:'product Details'} ,
    {path:"brands" , component:BrandsComponent , canActivate:[urlGuardGuard], title:'brands'} ,
    {path:"wishlist" , loadComponent : ()=> import('./features/pages/wishlist/wishlist/wishlist.component').then(list => list.WishlistComponent) , canActivate:[urlGuardGuard], title:'wish list'} ,
    {path:"checkOut/:cartID" , component:CheckOutComponent , canActivate:[urlGuardGuard], title:'checkOut'} ,
    {path:"allorders" , component:AllorderComponent , canActivate:[urlGuardGuard], title:'all order'} ,
    {path:"changepass" , loadComponent : ()=> import('./features/pages/changepass/changepass/changepass.component').then(pass => pass.ChangepassComponent) , canActivate:[urlGuardGuard], title:'change password'} ,
    {path:"login" , component:LoginComponent, title:'login'},
    {path:"forgetpassword" , loadComponent : ()=> import('./features/pages/forgetPassword/forgetpass/forgetpass.component').then(forget => forget.ForgetpassComponent), title:'forget password'},
    {path:"register" , component:RegisterComponent, title:'register'},
    {path:"**" , component:NotFoundComponent}
];




