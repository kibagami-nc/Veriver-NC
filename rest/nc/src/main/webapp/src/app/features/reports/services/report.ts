import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = '/api/reports';

  // Mock data for development
  private mockReports: Report[] = [
    {
      id: 1,
      title: 'Décharge sauvage Mont-Dore',
      description: 'Tas d\'ordures ménagères en bord de route.',
      latitude: -22.28,
      longitude: 166.50,
      reportType: 'WASTE',
      severity: 'HIGH',
      status: 'REPORTED',
      photos: [],
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Pollution rivière Dumbéa',
      description: 'Eau trouble et odeur suspecte.',
      latitude: -22.15,
      longitude: 166.45,
      reportType: 'CHEMICAL',
      severity: 'CRITICAL',
      status: 'IN_PROGRESS',
      photos: [],
      userId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    // return this.http.get<Report[]>(this.apiUrl);
    return of(this.mockReports);
  }

  getReport(id: number): Observable<Report | undefined> {
    // return this.http.get<Report>(`${this.apiUrl}/${id}`);
    return of(this.mockReports.find(r => r.id === id));
  }

  createReport(report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>): Observable<Report> {
    // return this.http.post<Report>(this.apiUrl, report);
    const newReport = {
      ...report,
      id: this.mockReports.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Report;
    this.mockReports.push(newReport);
    return of(newReport);
  }
}
