import { Injectable, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PersistService } from '../../../app/utils/persistService.service';
import { Lang } from './language';
import { Store } from '../../../app/utils/Store';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private _language = this.persistSvc.PSignal<string>(Store.LANG, Lang.IT);

  constructor(
    private translate: TranslateService,
    private persistSvc: PersistService
  ) {
    this.translate.setDefaultLang(Lang.IT);
    this.translate.use(this._language());
  }

  get language() {
    return this._language.asReadonly();
  }

  setLanguage(language: string) {
    this._language.set(language);
    this.translate.use(language);
  }
}
