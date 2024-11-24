// global.d.ts
export {};

declare global {
  interface Window {
    htmx: {
      process: (element: HTMLElement) => void;
      [key: string]: any; // Optionally allow other HTMX methods/properties
    };
  }
}
