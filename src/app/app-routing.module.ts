import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: InventoryComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: ''},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
