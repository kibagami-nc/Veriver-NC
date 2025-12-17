import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = '/api/events';

  // Mock data
  private mockEvents: Event[] = [
    {
      id: 1,
      title: 'Nettoyage Plage de la Baie des Citrons',
      description: 'Grand nettoyage de la plage et ses abords.',
      latitude: -22.29,
      longitude: 166.43,
      eventDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      duration: 3,
      maxParticipants: 50,
      materialsNeeded: ['Gants', 'Sacs poubelle', 'Pinces'],
      organizerId: 1,
      status: 'UPCOMING',
      participants: [1, 2, 3],
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Reboisement Parc Rivière Bleue',
      description: 'Plantation d\'espèces endémiques.',
      latitude: -22.10,
      longitude: 166.65,
      eventDate: new Date(Date.now() + 604800000).toISOString(), // Next week
      duration: 6,
      maxParticipants: 20,
      materialsNeeded: ['Pelles', 'Bottes', 'Eau'],
      organizerId: 2,
      status: 'UPCOMING',
      participants: [1],
      createdAt: new Date().toISOString()
    }
  ];

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return of(this.mockEvents);
  }

  getEvent(id: number): Observable<Event | undefined> {
    return of(this.mockEvents.find(e => e.id === id));
  }

  createEvent(event: Omit<Event, 'id' | 'createdAt' | 'participants' | 'status'>): Observable<Event> {
    const newEvent = {
      ...event,
      id: this.mockEvents.length + 1,
      status: 'UPCOMING',
      participants: [],
      createdAt: new Date().toISOString()
    } as Event;
    this.mockEvents.push(newEvent);
    return of(newEvent);
  }

  register(eventId: number, userId: number): Observable<boolean> {
    const event = this.mockEvents.find(e => e.id === eventId);
    if (event && !event.participants.includes(userId)) {
      event.participants.push(userId);
      return of(true);
    }
    return of(false);
  }
}
