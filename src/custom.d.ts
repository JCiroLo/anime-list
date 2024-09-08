declare namespace JSX {
  interface IntrinsicElements {
    "lite-youtube": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      children?: React.ReactNode;
      videoid?: string;
      posterquality?: "maxresdefault" | "sddefault" | "mqdefault" | "hqdefault";
      params?: string;
      autoload?: boolean;
      liteYoutubeIframeLoaded?: (event: Event) => void;
    };
  }
}
