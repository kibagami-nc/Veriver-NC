import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../services/report';

@Component({
  selector: 'app-report-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './report-create.html',
  styleUrl: './report-create.css'
})
export class ReportCreateComponent {
  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private router = inject(Router);

  reportForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    latitude: [0, [Validators.required]],
    longitude: [0, [Validators.required]],
    reportType: ['WASTE', [Validators.required]],
    severity: ['MEDIUM', [Validators.required]],
    photos: [[]]
  });

  isLoading = false;

  onSubmit() {
    if (this.reportForm.valid) {
      this.isLoading = true;
      const reportData = {
        ...this.reportForm.value,
        status: 'REPORTED',
        userId: 1, // Mock user ID
        photos: [] // Placeholder for photos
      };

      // @ts-ignore
      this.reportService.createReport(reportData).subscribe({
        next: () => {
          this.router.navigate(['/reports']);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  // Helper to get current location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.reportForm.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, (error) => {
        console.error('Error getting location', error);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
  }
}
