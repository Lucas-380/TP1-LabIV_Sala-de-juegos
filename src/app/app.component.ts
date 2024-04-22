import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from 'primeng/sidebar';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ButtonModule, SidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP-LabIV';
  sidebarVisible: boolean = false;

  constructor(private router: Router){

  }
  
  goTo(path: string) {
    this.router.navigate([path]);
  }
  
  
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

}
