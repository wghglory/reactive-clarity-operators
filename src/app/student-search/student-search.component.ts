import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { catchError, map, of, scan, startWith, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { ApiQuery } from '../shared/models/api-query';
import { switchMapWithLoading } from '../shared/operators/switchmap-with-loading.operator';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClarityModule, PageContainerComponent, AlertComponent],
  templateUrl: './student-search.component.html',
})
export class StudentSearchComponent {
  searchControl = new FormControl('');

  // search$ = this.searchControl.valueChanges.pipe(
  //   switchMap(value =>
  //     this.http.get<{ results: any }>(`https://randomuser.me/api?results=10`).pipe(
  //       map(data => ({ data, loading: false, error: null })),
  //       catchError(error => of({ error, loading: false, data: null })),
  //       startWith({ error: null, loading: true, data: null }),
  //     ),
  //   ),
  //   scan((state: ApiQuery<{ results: any }>, change: ApiQuery<{ results: any }>) => ({
  //     ...state,
  //     ...change,
  //   })),
  // );

  search$ = this.searchControl.valueChanges.pipe(
    switchMapWithLoading(value => this.http.get<{ results: any }>(`https://randomuser.me/api?results=10`)),
  );

  private http = inject(HttpClient);
}
