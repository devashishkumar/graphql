import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export const LOGIN_KEY = 'LOGINDATA';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  public isBrowserPlatform() {
    return isPlatformBrowser(this.platformId);
  }

  public setData(key: any, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.setItem(key, value);
    }
  }

  public getData(key: any) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    }
    return '';
  }

  public hasData(key: any) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.hasOwnProperty(key);
    }
    return '';
  }
}
