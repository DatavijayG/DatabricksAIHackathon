// Custom type declarations for missing packages
declare module 'bonjour' {
  const bonjour: any;
  export = bonjour;
}

// Add other missing type declarations here if needed
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.mov' {
  const src: string;
  export default src;
}
