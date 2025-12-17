import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReportService } from '../../services/report';
import { Report } from '../../models/report';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './report-details.html',
  styleUrl: './report-details.css'
})
export class ReportDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private reportService = inject(ReportService);
  report: Report | undefined;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.reportService.getReport(id).subscribe(data => {
        this.report = data;
      });
    }
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'REPORTED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
      case 'CLEANED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
