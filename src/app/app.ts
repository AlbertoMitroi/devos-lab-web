import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LeasingHubService } from './core/realtime/leasing-hub.service';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly hub = inject(LeasingHubService);

  ngOnInit(): void {
    this.hub.start().catch((err) => console.error('Leasing hub unavailable', err));
  }
}
