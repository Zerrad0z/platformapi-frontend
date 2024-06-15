import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, ApiDTO } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DemandeAuthorisationComponent } from '../demande-authorisation/demande-authorisation.component';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<ApiDTO>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getAllAPIs().subscribe(
      data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.error(error)
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(apiId: number): void {
    const dialogRef = this.dialog.open(DemandeAuthorisationComponent, {
      width: '300px',
      data: { apiId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the form submission, e.g., send the data to the backend
        console.log(result);
      }
    });
  }
}
