declare module 'isomorphic-style-loader/StyleContext' {
  import { Context } from 'react';

  type RemoveGlobalCss = () => void;
  type InsertCSS = (...styles: Style[]) => RemoveGlobalCss | void;
  interface StyleContextValue {
    insertCss: InsertCSS;
  }

  const StyleContext: Context<StyleContextValue>;

  export { StyleContext as default, InsertCSS };
}
