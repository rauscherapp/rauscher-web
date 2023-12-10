import { Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NotesListComponent } from './list/list.component';


export default [
    {
        path     : '',
        component: NotesComponent,
        children : [
            {
                path     : '',
                component: NotesListComponent,
            },
        ],
    },
] as Routes;
