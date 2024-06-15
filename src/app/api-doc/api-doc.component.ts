import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ApiDTO } from '../api.service';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.css']
})
export class ApiDocComponent implements OnInit {
  api!: ApiDTO;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const apiId = this.route.snapshot.paramMap.get('id');
    if (apiId) {
      this.apiService.getAPIById(+apiId).subscribe(
        (        data: ApiDTO) => this.api = data,
        (        error: any) => console.error(error)
      );
    }
  }
}
