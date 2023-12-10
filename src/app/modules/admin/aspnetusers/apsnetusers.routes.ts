import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AspnetUsersComponent } from './aspnetusers.component';
import { AspNetUserListComponent } from './list/apsnetusers.component';
import { AspNetUserService } from './aspnetusers.service';


export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'aspnetuserslist',
    },
    {
        path     : 'aspnetuserslist',
        component: AspnetUsersComponent,
        children : [
            {
                path     : '',
                component: AspNetUserListComponent,
                resolve  : {
                    aspnetusers    : () => inject(AspNetUserService).getAspNetUsersPagination()
                },
            },
        ],
    },
] as Routes;
