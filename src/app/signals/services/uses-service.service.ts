import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsesServiceService {

  private http = inject( HttpClient);
  private _baseUrl = 'https://reqres.in/api/users';

  getUserById(id: number): Observable<User>{

    return this.http.get<SingleUserResponse>(`${this._baseUrl}/${id}`)
      .pipe(
        map(response => response.data),
        tap(console.log)
      );
  }

}
