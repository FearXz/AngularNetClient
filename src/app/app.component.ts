import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { Header } from './mainComponents/header/Header';
import { Footer } from './mainComponents/footer/Footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <Header></Header>
    <router-outlet></router-outlet>
    <Footer></Footer>
  `,
})
export class AppComponent {
  title = environment.apiUrl;
}
