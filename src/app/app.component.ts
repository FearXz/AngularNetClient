import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/Header';
import { Footer } from './layout/footer/Footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'App';
  constructor() {}
}
