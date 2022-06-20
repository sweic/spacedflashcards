import { css } from "styled-components";
export const font = {
  regular: 'font-family: "CircularStdBook"; font-weight: normal;',
  medium: 'font-family: "CircularStdMedium"; font-weight: normal;',
  bold: 'font-family: "CircularStdBold"; font-weight: normal;',
  black: 'font-family: "CircularStdBlack"; font-weight: normal;',
  size: (size: number) => `font-size: ${size}px;`,
};

export const color = {
  primary: "#B0C4DE",
  secondary: "#light-white",
  text: "#79a4db",
  select: "#a5b8d1",
  dangerous: "#E13C3C",
  paperBackground: "#f4f5f7",
  primarybg: "#f5f5f5",
};

export const mixins = {
  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  boxShadowMedium: css`
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  `,
};
