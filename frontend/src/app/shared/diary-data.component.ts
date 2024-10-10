import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, catchError, throwError } from 'rxjs';
import { DiaryEntry } from './dairy-entry.model';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {
  public maxId: number = 0; // Inicializado para evitar errores, puede ser eliminado si no se usa

  constructor(private http: HttpClient) {}

  public diarySubject = new Subject<DiaryEntry[]>();
  private diaryEntries: DiaryEntry[] = [];

  updateEntry(id: string, entry: DiaryEntry) {
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/update-entry/' + id,
        entry
      )
      .pipe(
        catchError((error) => {
          console.error('Update entry failed', error);
          return throwError(error); // Emite error si la petición falla
        })
      )
      .subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries(); // Refresca los datos tras la actualización
      });
  }

  onDeleteEntry(id: string) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/remove-entry/' + id)
      .pipe(
        catchError((error) => {
          console.error('Delete entry failed', error);
          return throwError(error);
        })
      )
      .subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries();
      });
  }

  getDiaryEntries() {
    this.http
      .get<{ diaryEntries: { date: string; entry: string; _id: string }[] }>(
        'http://localhost:3000/diary-entries'
      )
      .pipe(
        map((responseData) => {
          return responseData.diaryEntries.map((entry) => {
            return {
              date: entry.date,
              entry: entry.entry,
              id: entry._id,
            };
          });
        }),
        catchError((error) => {
          console.error('Fetch diary entries failed', error);
          return throwError(error);
        })
      )
      .subscribe((updateResponse) => {
        this.diaryEntries = updateResponse;
        this.diarySubject.next(this.diaryEntries); // Notifica a los suscriptores
      });
  }

  getDiaryEntry(id: string) {
    const index = this.diaryEntries.findIndex((el) => el.id === id);
    if (index !== -1) {
      return this.diaryEntries[index];
    } else {
      console.error(`Diary entry with id ${id} not found`);
      return null;
    }
  }

  onAddDiaryEntry(diaryEntry: DiaryEntry) {
    this.http
      .post<{ message: string }>('http://localhost:3000/add-entry', diaryEntry)
      .pipe(
        catchError((error) => {
          console.error('Add diary entry failed', error);
          return throwError(error);
        })
      )
      .subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries(); // Refresca los datos tras la adición
      });
  }
}
