import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // ✅ Import Router
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('captchaCanvas', { static: false }) captchaCanvas!: ElementRef<HTMLCanvasElement>;

  client = {
    email: "",
    password: "",
  };

  captcha: string = '';       
  userInput: string = ''; 
  errorMessage: string = ''; 
  showPassword: boolean = false; 

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    this.generateCaptcha();
    localStorage.removeItem('authToken');
    localStorage.removeItem('uuid');
    localStorage.removeItem('email'); // ✅ Clear email on logout
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    this.captcha = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    const canvas = this.captchaCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '28px Arial';
    ctx.fillStyle = '#000';

    for (let i = 0; i < this.captcha.length; i++) {
      const x = 15 + i * 20 + Math.random() * 10;
      const y = 30 + Math.random() * 5;
      ctx.fillText(this.captcha[i], x, y);
    }
  }

  onLogin() {
    this.errorMessage = '';
    if (this.userInput.toLowerCase() !== this.captcha.toLowerCase()) {
      this.errorMessage = "❌ CAPTCHA incorrect! Please try again.";
    
      return; 
    }
  
    this.authService.login(this.client.email, this.client.password).subscribe({
      next: (response) => {
      console.log('✅ Login successful, redirecting...', response);
      localStorage.setItem('authToken', 'your-generated-token'); // If applicable
      localStorage.setItem('uuid', response.uuid); // Store UUID
      localStorage.setItem('email', response.email); // ✅ Store email
      this.router.navigate(['/menu']);
        if (response?.uuid) {
          this.router.navigate(['/menu']);
        } else {
          console.error('🚨 UUID is missing in response');
        }
      },
      error: (err): void => {
        console.error('🚨 Login error:', err);
        this.errorMessage = "❌ Login failed! Please check your credentials.";
      }
    });
  }
  
}
