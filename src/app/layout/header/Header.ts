import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../../assets/i18n/library/I18nService.service';
import { Lang } from '../../../assets/i18n/library/language';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './Header.html',
})
export class Header {
  currFlag = '../../../assets/images/utilities/it.svg';
  IT = Lang.IT;
  EN = Lang.EN;
  title = 'HEADER';

  constructor(private translateSvc: I18nService) {}

  ngOnInit(): void {
    this.loadCurrFlag();
  }

  changeLang(language: string): void {
    this.translateSvc.changeLanguage(language);
    this.loadCurrFlag();
  }

  private loadCurrFlag(): void {
    let lang = this.translateSvc.currLang();
    this.currFlag = `../../../assets/images/utilities/${lang}.svg`;
  }
}
