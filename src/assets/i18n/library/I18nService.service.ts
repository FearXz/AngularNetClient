import { Injectable, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PersistService } from '../../../app/utils/persistService.service';
import { Lang } from './language';
import { Store } from '../../../app/utils/Store';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private _currLang = this.persistSvc.PSignal<string>(Store.LANG, Lang.IT);

  constructor(
    private translate: TranslateService,
    private persistSvc: PersistService,
    private http: HttpClient
  ) {
    this.translate.setDefaultLang(Lang.IT);
    this.translate.use(this._currLang());
  }

  get currLang() {
    return this._currLang.asReadonly();
  }

  changeLanguage(language: string) {
    this._currLang.set(language);
    this.translate.use(language);
  }
}
