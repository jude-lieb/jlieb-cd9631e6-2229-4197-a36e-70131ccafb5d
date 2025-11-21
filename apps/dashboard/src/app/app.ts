import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, LoginResult } from './auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected loading = false;
  protected error = '';
  protected user: LoginResult | null = null;

  protected loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService) {}

  protected async submit() {
    if (this.loginForm.invalid) {
      this.error = 'Please provide both username and password.';
      return;
    }

    this.error = '';
    this.loading = true;
    this.user = null;

    try {
      const credentials = this.loginForm.getRawValue() as {
        username: string;
        password: string;
      };
      this.user = await this.auth.login(credentials.username, credentials.password);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Login failed';
    } finally {
      this.loading = false;
    }
  }
}
