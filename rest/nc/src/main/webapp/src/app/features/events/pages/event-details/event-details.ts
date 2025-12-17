import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  event: Event | undefined;
  isRegistered = false;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.eventService.getEvent(id).subscribe(data => {
        this.event = data;
        // Check if current user is registered (mock user id 1)
        this.isRegistered = this.event?.participants.includes(1) || false;
      });
    }
  }

  register() {
    if (this.event) {
      this.eventService.register(this.event.id, 1).subscribe(success => {
        if (success) {
          this.isRegistered = true;
          // Refresh event data
          this.eventService.getEvent(this.event!.id).subscribe(data => this.event = data);
        }
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'UPCOMING': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
