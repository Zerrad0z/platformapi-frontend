import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8092';  // Update URL if necessary
  private userProfile: any;

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
    } : {});

    return this.http.post(`${this.baseUrl}/login`, {}, { headers, responseType: 'text' }).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this.fetchUserProfile();
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  fetchUserProfile(): void {
    this.http.get(`${this.baseUrl}/api/user/profile`).subscribe(profile => {
      this.userProfile = profile;
    });
  }

  getUserProfile(): any {
    return this.userProfile;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.userProfile = null;
  }
}
