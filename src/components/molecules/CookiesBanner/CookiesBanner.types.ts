export interface CookiesBannerProps {
  onAcceptCookies: () => void;
  onDeclineCookies: (args?: {skipGAEvent?: boolean}) => void;
}
