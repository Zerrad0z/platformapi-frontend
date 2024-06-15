import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, DemandeAuthorisationDTO } from '../api.service';

@Component({
  selector: 'app-demande-authorisation',
  templateUrl: './demande-authorisation.component.html',
  styleUrls: ['./demande-authorisation.component.css']
})
export class DemandeAuthorisationComponent {
  demandeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<DemandeAuthorisationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { apiId: number }
  ) {
    this.demandeForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.demandeForm.valid) {
      const demande: DemandeAuthorisationDTO = {
        ...this.demandeForm.value,
        apiId: this.data.apiId
      };

      this.apiService.createDemandeAuthorisation(demande).subscribe(
        result => {
          console.log('Authorization request created', result);
          this.dialogRef.close(result);
        },
        error => {
          console.error('Error creating authorization request', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
