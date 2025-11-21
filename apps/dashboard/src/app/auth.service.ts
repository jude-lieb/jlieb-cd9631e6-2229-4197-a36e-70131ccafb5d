import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface LoginResult {
  id: number;
  username: string;
  role: 'admin' | 'user';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  async login(username: string, password: string): Promise<LoginResult> {
    try {
      return await firstValueFrom(
        this.http.post<LoginResult>('/api/auth/login', { username, password }),
      );
    } catch (err) {
      const message =
        err instanceof HttpErrorResponse && err.error
          ? typeof err.error === 'string'
            ? err.error
            : err.error.message ?? 'Login failed'
          : 'Login failed';
      throw new Error(message);
    }
  }
}
