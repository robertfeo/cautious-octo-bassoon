export { };

declare global {
  interface Window {
    htmx: {
      process: (element: HTMLElement) => void;
      [key: string]: any;
    };
  }
}
