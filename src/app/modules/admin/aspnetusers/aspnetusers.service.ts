import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AspNetUser, AspNetUserPagination } from 'app/core/aspnetuser/aspnetusers.types';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AspNetUserService {
  private _aspNetUsers: BehaviorSubject<AspNetUser[] | null> = new BehaviorSubject(null);
  private _aspNetUser: BehaviorSubject<AspNetUser | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<AspNetUserPagination | null> = new BehaviorSubject(null);  

  constructor(private _httpClient: HttpClient) {}

  get aspNetUsers$(): Observable<AspNetUser[]> {
    return this._aspNetUsers.asObservable();
  }

    /**
     * Getter for note
     */
    get aspNetUser$(): Observable<AspNetUser>
    {
        return this._aspNetUser.asObservable();
    }
    /**
     * Getter for pagination
     */
    get pagination$(): Observable<AspNetUserPagination>
    {
        return this._pagination.asObservable();
    }      

  getAspNetUsers(): Observable<AspNetUser[]> {
    return this._httpClient.get<AspNetUser[]>('api/aspnetusers').pipe(
      tap(aspNetUsers => {
        this._aspNetUsers.next(aspNetUsers);
      })
    );
  }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAspNetUsersPagination(page: number = 0, size: number = 10, sort: string = 'userName', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: AspNetUserPagination; users: AspNetUser[] }>
    {
        return this._httpClient.get<{ pagination: AspNetUserPagination; users: AspNetUser[] }>('api/aspnetuserslist', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search,
            },
        }).pipe(
            tap((response) =>
            {
                this._pagination.next(response.pagination);
                this._aspNetUsers.next(response.users);
            }),
        );
    }  


  getAspNetUserById(id: string): Observable<AspNetUser> {
    return this.aspNetUsers$.pipe(
      take(1),
      switchMap(aspNetUsers => {
        const aspNetUser = aspNetUsers.find(item => item.id === id) || null;
        if (!aspNetUser) {
          return throwError(`Could not find ASP.NET user with id of ${id}!`);
        }
        return of(aspNetUser);
      })
    );
  }

  createAspNetUser(user: AspNetUser): Observable<AspNetUser>
  {
      return this._httpClient.post<AspNetUser>('api/aspnetusers', {user: user}).pipe(
          switchMap(response => this.getAspNetUsers().pipe(
              switchMap(() => this.getAspNetUserById(response.id).pipe(
                  map(() => response),
              )),
          )));
  }

  updateAspNetUser(id: string, aspNetUser: AspNetUser): Observable<AspNetUser> {
    return this.aspNetUsers$.pipe(
      take(1),
      switchMap(aspNetUsers =>
        this._httpClient.patch<AspNetUser>('api/aspnetusers', {
          id,
          aspNetUser
        }).pipe(
          map(updatedAspNetUser => {
            const index = aspNetUsers.findIndex(item => item.id === id);
            aspNetUsers[index] = updatedAspNetUser;
            this._aspNetUsers.next(aspNetUsers);
            return updatedAspNetUser;
          })
        )
      )
    );
  }

  deleteAspNetUser(id: string): Observable<boolean> {
    return this.aspNetUsers$.pipe(
      take(1),
      switchMap(aspNetUsers =>
        this._httpClient.delete('api/aspnetusers', {
          params: { id }
        }).pipe(
          map((isDeleted: boolean) => {
            const index = aspNetUsers.findIndex(item => item.id === id);
            aspNetUsers.splice(index, 1);
            this._aspNetUsers.next(aspNetUsers);
            return isDeleted;
          })
        )
      )
    );
  }
}
