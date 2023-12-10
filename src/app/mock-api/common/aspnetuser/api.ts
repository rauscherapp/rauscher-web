import { Injectable } from '@angular/core';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { AspNetUser } from 'app/core/aspnetuser/aspnetusers.types';
import { assign, cloneDeep } from 'lodash-es';
import mockUsers from './data';


@Injectable({ providedIn: 'root' })
export class AspNetUsersMockApi {
  private _users: AspNetUser[] = mockUsers // Initialize with your mock data or fetch it from somewhere

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ AspNetUsers - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/aspnetusers').reply(() => [200, cloneDeep(this._users)]);

    this._fuseMockApiService
    .onGet('api/aspnetuserslist', 300)
    .reply(({request}) =>
    {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'userName';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);

        // Clone the products
        let users: any[] | null = cloneDeep(this._users);

        // Sort the products
        if ( sort === 'userName' || sort === 'email')
        {
            users.sort((a, b) =>
            {
                const fieldA = a[sort].toString().toUpperCase();
                const fieldB = b[sort].toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        }
        else
        {
            users.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
        }

        // If search exists...
        if ( search )
        {
            // Filter the products
            users = users.filter(contact => contact.normalizedUserName && contact.normalizedUserName.toLowerCase().includes(search.toLowerCase()));
        }

        // Paginate - Start
        const usersLength = users.length;

        // Calculate pagination details
        const begin = page * size;
        const end = Math.min((size * (page + 1)), usersLength);
        const lastPage = Math.max(Math.ceil(usersLength / size), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested page number is bigger than
        // the last possible page number, return null for
        // products but also send the last possible page so
        // the app can navigate to there
        if ( page > lastPage )
        {
            users = null;
            pagination = {
                lastPage,
            };
        }
        else
        {
            // Paginate the results by size
            users = users.slice(begin, end);

            // Prepare the pagination mock-api
            pagination = {
                length    : usersLength,
                size      : size,
                page      : page,
                lastPage  : lastPage,
                startIndex: begin,
                endIndex  : end - 1,
            };
        }

        // Return the response
        return [
            200,
            {
                users: users,
                pagination,
            },
        ];
    });     

    // -----------------------------------------------------------------------------------------------------
    // @ AspNetUsers - POST
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onPost('api/aspnetusers').reply(({ request }) => {
      // Get the user
      const newUser = cloneDeep(request.body.user);

      // Generate a new GUID
      newUser.id = FuseMockApiUtils.guid();

      // Add the new user
      this._users.push(newUser);

      // Return the response
      return [200, newUser];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ AspNetUsers - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onPatch('api/aspnetusers').reply(({ request }) => {
      // Get the id and user
      const id = request.body.id;
      const updatedUser = cloneDeep(request.body.user);

      // Find and update the user
      const index = this._users.findIndex((user) => user.id === id);
      if (index !== -1) {
        this._users[index] = assign({}, this._users[index], updatedUser);
      }

      // Return the response
      return [200, this._users[index]];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ AspNetUsers - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onDelete('api/aspnetusers').reply(({ request }) => {
      // Get the id
      const id = request.params.get('id');

      // Find and delete the user
      const index = this._users.findIndex((user) => user.id === id);
      const deletedUser = index !== -1 ? cloneDeep(this._users[index]) : null;
      if (index !== -1) {
        this._users.splice(index, 1);
      }

      // Return the response
      return [200, deletedUser];
    });
  }
}
