import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../service/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier implements OnInit{

  constructor(private api: Api, private router: Router, private cdr: ChangeDetectorRef) {}
  suppliers: any[] = [];
  message: string = '';

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(): void {
    this.api.getAllSuppliers().subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.suppliers = res.suppliers;
          
        } else {
          this.showMessage(res.message);
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.showMessage(
          error?.error?.message ||
            error?.message ||
            'Unable to get suppliers' + error
        );
      },
    });
  }


  //Navigate to add supplier Page
  navigateToAddSupplierPage(): void {
    this.router.navigate([`/add-supplier`]);
  }

  //Navigate to edit supplier Page
  navigateToEditSupplierPage(supplierId: string): void {
    this.router.navigate([`/edit-supplier/${supplierId}`]);
  }

  //Delete a category
  handleDeleteSupplier(supplierId: string):void{
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      this.api.deleteSupplier(supplierId).subscribe({
        next:(res:any) =>{
          if (res.status === 200) {
            this.showMessage("Supplier deleted successfully")
            this.getSuppliers(); //reload the category
            this.cdr.detectChanges();
          }
        },
        error:(error) =>{
          this.showMessage(error?.error?.message || error?.message || "Unable to Delete Supplier" + error)
        }
      })
    }
  }





  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 4000);
  }









  }



