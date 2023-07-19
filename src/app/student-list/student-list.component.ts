import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClarityModule, ClrDatagridStateInterface } from '@clr/angular';
import { isEqual } from 'lodash-es';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, share, startWith, switchMap } from 'rxjs';

import { StudentService } from './student.service';
import { Student } from './student.model';
import { dgState } from '../shared/operators/dg-state.operator';
import { stateHandler } from '../shared/utils/datagrid.util';
import { ApiQuery } from '../shared/models/api-query';
import { api } from '../shared/operators/api.operator';
import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { AlertComponent } from '../shared/components/alert/alert.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ClarityModule, PageContainerComponent, AlertComponent],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  selectedStudent: Student | undefined;

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  dgState$ = this.dgSource.pipe(dgState());

  studentService = inject(StudentService);

  students$: Observable<ApiQuery<Student[]>> = combineLatest([this.dgState$, this.studentService.refresh$]).pipe(
    switchMap(([state]) => {
      const params = stateHandler(state);
      return this.studentService.getStudentList(params).pipe(api());
    }),
    startWith({ loading: true, error: null, data: null }), // used to trigger the first render of datagrid.
    share(),
  );

  total$ = this.students$.pipe(
    filter(s => Boolean(s.data)),
    distinctUntilChanged(isEqual),
    map(res => res.data?.length),
  );

  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.next(state);
  }
}
