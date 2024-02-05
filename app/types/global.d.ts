export { }

declare global {
 interface Window {
  __ENV: { [key: string]: string };
 }
}