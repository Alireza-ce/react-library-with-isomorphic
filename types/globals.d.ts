import React from 'react';
import { Reducer } from 'redux';
import { MobileDetectType } from './index';

type Feature = {
  key: string;
  defVal: boolean;
};

type ToastrAction = (message: React.ReactNode, title: React.ReactNode, optionsOverride?: object) => void;

declare global {
  declare module '*.json' {
    const content: Record<string, unknown>;
    export default content;
  }

  declare module '*.svg' {
    const content: string;
    export default content;
  }

  declare module '*.webp' {
    const content: string;
    export default content;
  }

  declare module '*.gif' {
    const content: string;
    export default content;
  }

  declare module '*.png' {
    const content: string;
    export default content;
  }

  declare module '*.scss' {
    const content: Style;
    export default content;
  }

  declare module '*.css' {
    const content: Style;
    export default content;
  }

  type Style = {
    _getCss: () => string;
    _insertCss: () => () => void;
    [name: string]: string;
  };

  interface Window {
    setActive: (feature: string | Feature, active?: boolean) => void;
    isActive: (feature: string | Feature) => boolean;
    features: Record<string, Feature>;
    deepMerge: deepmerge;
    opr: { addons: unknown };
    chrome: { webstore: unknown };
    StyleMedia: { type: unknown };
    safari: { pushNotification: object };
    HTMLElement: string;
    documentMode: unknown;
    opera: unknown;
    InstallTrigger: unknown;
    toastr: {
      error: ToastrAction;
      info: ToastrAction;
      success: ToastrAction;
      warning: ToastrAction;
      options: object;
      clear: () => void;
    };
    md: MobileDetectType;
    ga: (action: string, type: string, createPath: (loacation: Location) => unknown) => unknown;
    App: {
      state: Reducer;
      apiUrl: string;
    };
  }

  interface Document {
    documentMode?: unknown;
  }
}

export {};
