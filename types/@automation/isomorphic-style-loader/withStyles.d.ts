declare module 'isomorphic-style-loader/withStyles' {
  function withStyles(
    ...styles: Styles[]
  ): <P, S, T = React.FunctionComponent<P> | React.ComponentClass<P, S>>(component: T) => T;

  export = withStyles;
}
