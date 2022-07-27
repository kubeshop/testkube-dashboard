import {createGlobalStyle} from 'styled-components';

import {BackgroundColors} from '@styles/Colors';

export const invisibleScroll = `
&::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari and Opera */
-ms-overflow-style: none; /* IE and Edge */
scrollbar-width: none; /* Firefox */
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${BackgroundColors.mainBackground};
  }

  h1,
  h2,
  h3 {
    margin: 0 !important;
  }

  h1.ant-typography.dashboard-title {
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
  }

  h2.ant-typography.dashboard-title {
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
  }

  h3.ant-typography.dashboard-title {
    font-weight: 500;
    line-height: 30px;
  }

  .regular {
    font-weight: 400;
  }

  .normal {
    font-weight: 500;
  }

  .bold {
    font-weight: 700;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .text-center {
    text-align: center;
  }

  .ant-layout-content {
    display: flex;
    flex-direction: column;
  }

  .running-icon {
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .ant-tabs-content-holder {
    overflow: auto;

    .ant-tabs-content {
      height: 100%;
    }
  }

  .ant-avatar {
    display: flex;
    
    overflow: unset;
  }
  .ant-notification-notice {
    padding-bottom: 24px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

/* Media Sizes */
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

/* Devices */

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
