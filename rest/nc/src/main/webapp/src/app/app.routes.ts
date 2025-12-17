import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register';
import { authGuard } from './core/guards/auth-guard';

import { MapComponent } from './features/map/components/map/map';
import { ReportListComponent } from './features/reports/pages/report-list/report-list';
import { ReportDetailsComponent } from './features/reports/pages/report-details/report-details';
import { ReportCreateComponent } from './features/reports/pages/report-create/report-create';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: MapComponent },
    { path: 'reports', component: ReportListComponent },
    { path: 'reports/create', component: ReportCreateComponent },
    { path: 'reports/:id', component: ReportDetailsComponent },
    // Add other routes here, protected by authGuard
];
