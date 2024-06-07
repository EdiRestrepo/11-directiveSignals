import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsesServiceService } from '../../services/uses-service.service';
import { User } from '../../interfaces/user-request.interface';
import { single } from 'rxjs';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  private _usersService = inject(UsesServiceService);
  public userId = signal(1);

  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);

  public fullName = computed<string>(()=>{

    if(!this.currentUser()) return 'Usuario no encontrado';


    return `${ this.currentUser()?.first_name} ${ this.currentUser()?.last_name}`;
  })

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }

  loadUser(id: number){
    if( id <= 0) return;
    this.userId.set(id);

    this.currentUser.set(undefined); //esto se hace para que al cambiar de usuario se borre el actual y parezca mas rapido el cambio de un usuario a otro

    this._usersService.getUserById( id )
      .subscribe( user => {
        this.currentUser.set( user )
      })

  }

}
