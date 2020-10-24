import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: 
        [   
            {
                path: 'users',
                loadChildren: () => import('./users-page/users-page.module').then(m => m.UsersPageModule)
            },
            {
                path: '',
                redirectTo: '/users'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }