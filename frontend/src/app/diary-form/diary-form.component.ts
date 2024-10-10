import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryEntry } from '../shared/dairy-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css'],
})
export class DiaryFormComponent implements OnInit {
  editMode = false;
  private paramId: string = ''; // Inicialización de la propiedad
  diaryEntry: DiaryEntry | null = null;
  diaryForm: FormGroup = new FormGroup({}); // Inicializar el formulario vacío
  constructor(
    private diaryDataService: DiaryDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.diaryEntry = this.diaryDataService.getDiaryEntry(this.paramId);
      }

      this.initializeForm();
    });
  }

  private initializeForm(): void {
    this.diaryForm = new FormGroup({
      date: new FormControl(
        this.editMode && this.diaryEntry ? this.diaryEntry.date : '',
        [Validators.required]
      ),
      entry: new FormControl(
        this.editMode && this.diaryEntry ? this.diaryEntry.entry : '',
        [Validators.required]
      ),
    });
  }

  onSubmit(): void {
    if (!this.diaryForm.valid) return;

    const entry = new DiaryEntry(
      this.paramId || '',
      this.diaryForm.value.date,
      this.diaryForm.value.entry
    );

    if (this.editMode) {
      this.diaryDataService.updateEntry(this.paramId, entry);
    } else {
      this.diaryDataService.onAddDiaryEntry(entry);
    }

    this.router.navigateByUrl('/');
  }
}
