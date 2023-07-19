import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, of, timer, throwError } from 'rxjs';
import { PageQuery } from '../shared/models/page-query';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  private refreshBS = new BehaviorSubject<void>(undefined);
  refresh$ = this.refreshBS.asObservable();

  refreshList() {
    this.refreshBS.next();
  }

  getStudentList(params: Partial<PageQuery>) {
    // return timer(1000).pipe(
    //   switchMap(() => {
    //     throw new Error('wrong');
    //   }),
    // );

    return timer(1000).pipe(
      switchMap(() => {
        return of([
          {
            id: '001',
            firstName: 'Derek',
            lastName: 'Wang',
            age: 30,
            lastModifiedDate: new Date(),
          },
          {
            id: '002',
            firstName: 'Michael',
            lastName: 'Jordan',
            age: 40,
            lastModifiedDate: new Date(),
          },
          {
            id: '003',
            firstName: 'Iris',
            lastName: 'Yuan',
            age: 18,
            lastModifiedDate: new Date(),
          },
          {
            id: '004',
            firstName: 'Qing',
            lastName: 'Wang',
            age: 50,
            lastModifiedDate: new Date(),
          },
          {
            id: '005',
            firstName: 'Xiulan',
            lastName: 'Sui',
            age: 70,
            lastModifiedDate: new Date(),
          },
          {
            id: '006',
            firstName: 'William',
            lastName: 'Zhou',
            age: 35,
            lastModifiedDate: new Date(),
          },
        ]);
      }),
    );
    // return this.http.get<Student[]>('/api/students', { params });
  }

  getStudent(id: string) {
    return this.http.get<Student>(`/api/students/${id}`);
  }

  addStudent(payload: Partial<Student>) {
    return this.http.post<Student>(`/api/students`, payload);
  }

  updateStudent(id: string, payload: Partial<Student>) {
    return this.http.patch<Student>(`/api/students/${id}`, payload);
  }

  deleteStudent(id: string) {
    return this.http.delete<void>(`/api/students/${id}`);
  }
}
