import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Données mockées pour le dashboard
  stats = {
    students: { value: 256, trend: '+12% ce mois' },
    teachers: { value: 45, trend: '+3 cette semaine' },
    groups: { value: 12, trend: 'Formation en cours' }
  };

  activities = [
    { icon: '👤', title: 'Nouvel intervenant ajouté', time: 'Il y a 2h' },
    { icon: '👥', title: 'Nouveau groupe créé', time: 'Il y a 3h' }
  ];
}
