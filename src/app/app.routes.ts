import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentSearchComponent } from './student-search/student-search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full',
  },
  {
    path: 'students',
    component: StudentListComponent,
  },
  {
    path: 'student-search',
    component: StudentSearchComponent,
  },
];
