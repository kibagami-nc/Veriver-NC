import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';
import { ReportService } from '../../../reports/services/report';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef;
  map!: L.Map;
  private reportService = inject(ReportService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.loadReports();
    }
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([-22.2711, 166.4416], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Fix for default marker icon
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  private loadReports() {
    this.reportService.getReports().subscribe(reports => {
      reports.forEach(report => {
        L.marker([report.latitude, report.longitude])
          .addTo(this.map)
          .bindPopup(`
            <b>${report.title}</b><br>
            ${report.description}<br>
            <span class="text-xs font-bold ${this.getSeverityColor(report.severity)}">${report.severity}</span>
          `);
      });
    });
  }

  private getSeverityColor(severity: string): string {
    switch (severity) {
      case 'LOW': return 'text-green-600';
      case 'MEDIUM': return 'text-yellow-600';
      case 'HIGH': return 'text-orange-600';
      case 'CRITICAL': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }
}
