import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
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
  currLang = computed<string>(() => this.translateSvc.language());
  currFlag: string = '';
  IT = Lang.IT;
  EN = Lang.EN;
  title = 'HEADER';

  constructor(private translateSvc: I18nService) {
    effect(() => {
      this.currFlag = `../../../assets/images/utilities/${this.currLang()}.svg`;
    });
  }

  changeLang(language: string): void {
    this.translateSvc.setLanguage(language);
  }
}
