import { inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const WINDOW = new InjectionToken<Window>('Abstract window', {
  factory: () => {
    const { defaultView } = inject(DOCUMENT);
    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  },
});

export const LOCAL_STORAGE = new InjectionToken<Storage>('Abstract localStorage object', {
  factory: () => {
    const { localStorage } = inject(WINDOW) as Window;
    if (!localStorage) {
      throw new Error('localStorage is not available');
    }

    return localStorage;
  },
});
