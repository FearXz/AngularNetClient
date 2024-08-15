import { I18nService } from '../assets/i18n/library/I18nService.service';
import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.prod';
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
  constructor(private translateSvc: I18nService) {
    this.translateSvc.loadTranslations();
  }
}
