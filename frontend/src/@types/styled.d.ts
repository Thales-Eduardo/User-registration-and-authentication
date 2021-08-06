import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      header: string;
      backgroundButton: string;
      colorButton: string;
      color: string;
      backgroundinfo: string;
      colorinfo: string;
      backgroundSuccess: string;
      colorSuccess: string;
      backgroundError: string;
      colorError: string;
    };
  }
}
