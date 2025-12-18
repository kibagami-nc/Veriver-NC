import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './event-create.html',
  styleUrl: './event-create.css'
})
export class EventCreateComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);

  eventForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    latitude: [0, [Validators.required]],
    longitude: [0, [Validators.required]],
    eventDate: ['', [Validators.required]],
    duration: [1, [Validators.required, Validators.min(1)]],
    maxParticipants: [10, [Validators.required, Validators.min(1)]],
    materialsNeeded: [''] // Comma separated string for simplicity
  });

  isLoading = false;

  onSubmit() {
    if (this.eventForm.valid) {
      this.isLoading = true;
      const formValue = this.eventForm.value;

      const eventData = {
        title: formValue.title!,
        description: formValue.description!,
        latitude: formValue.latitude!,
        longitude: formValue.longitude!,
        eventDate: new Date(formValue.eventDate!).toISOString(),
        duration: formValue.duration!,
        maxParticipants: formValue.maxParticipants!,
        materialsNeeded: formValue.materialsNeeded ? formValue.materialsNeeded.split(',').map(s => s.trim()) : [],
        organizerId: 1 // Mock user ID
      };

      this.eventService.createEvent(eventData).subscribe({
        next: () => {
          this.router.navigate(['/events']);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.eventForm.patchValue({
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
