declare module JSX {
  export interface Element {}
  export interface IntrinsicElements {
    [tagName: string]: any;
  }
}
