import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Product, ProductData } from './interfaces/product.interface';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
  products: Product[] = [];
  
  constructor(private inventoryService: InventoryService){}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.inventoryService.getItems()
      .subscribe( (products: Product[]) => this.products = products.sort((p1, p2) => 
        Number(new Date(p1.productLastUpdate)) - Number(new Date(p2.productLastUpdate))
      ))
  };

  uploadItem(){

    Swal.fire({
      title: 'Agregar Producto',
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre">
        <input type="number" id="stock" class="swal2-input" placeholder="Stock">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('name') as any).value;
        const stock = (document.getElementById('stock') as any).value;

        if (!name) {
          Swal.showValidationMessage('El nombre es requerido');
          return;
        }
        if (stock === '' || Number(stock) < 0) {
          Swal.showValidationMessage('El stock debe ser un número mayor o igual a 0');
          return;
        }

        return { productName: name, productStock: Number(stock) };
      },
      confirmButtonText: 'Subir',
    }).then((result: SweetAlertResult<ProductData>) => {
      if (result.isConfirmed) {
        if( result.value )
          this.inventoryService.uploadItem(result.value)
            .subscribe((data) => {
              this.getItems();
              Swal.fire({
                title: 'Listo!',
                icon: 'success'
              })

            })
      }
    });

  }
}
