import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Api } from './service/api';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ims';
  constructor(private api: Api,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

      isAuth():boolean{

        return this.api.isAuthenticated();

      }

       isAdmin():boolean{

        return this.api.isAdmin();


        

      }

      logOut():void{
        this.api.logout();
        this.router.navigate(["/login"])
        this.cdr.detectChanges();

      }




}
