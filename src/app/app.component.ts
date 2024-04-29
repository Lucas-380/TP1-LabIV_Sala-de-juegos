import { Component, OnInit, ViewChild, HostListener  } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Auth, signOut } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { Sidebar, SidebarModule} from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ButtonModule, MenubarModule, LoginComponent, SidebarModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService]
})

export class AppComponent implements OnInit {
  title = 'Sala de Juegos';
  sidebarVisible: boolean = false;
  visible: boolean = false;
  sesion: boolean = false;
  isSmallScreen: boolean = false;

  constructor(private router: Router, public auth: Auth, private confirmationService: ConfirmationService){

  }
  
  goTo(path: string) {
    this.router.navigate([path]);
  }

  //navbar
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.checkScreenSize();
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.sesion = true;
      }
    });
    console.log(this.sesion);
    
  }
  
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  CloseSession(){
    this.confirmarCerrarSesion();
  }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.checkScreenSize();
  }
  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  public confirmarCerrarSesion() {
    this.confirmationService.confirm({
        header: '¿Seguro que quiere cerrar sesion?',
        message: 'Confirme si realmente quiere salir.',
        accept: () => {
          signOut(this.auth).then(() => {
            //seguro que quiere cerrar la sesion ? 
            console.log(this.auth.currentUser?.email);
          })
        },
        reject: () => {
        }
    });
  }


}