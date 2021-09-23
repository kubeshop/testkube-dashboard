import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      background: var(--color-dark-primary);
      color: var(--color-gray-tertiary);
      font-family: var(--font-family-sans);
      box-sizing: border-box;
    }

    tr,
    td {
      border: 1px solid var(--color-gray-secondary);
      overflow: hidden;
    }

    p {
      margin-bottom: none;
    }

    .ant-picker-input > input {
      color: var(--color-light-primary);
    }

    .ant-picker-panel-container {
      background: var(--color-dark-primary);
      color: var(--color-light-primary);
    }

    .ant-picker-header-view,
    .ant-picker-cell-inner,
    .ant-picker-header-super-next-btn,
    .ant-picker-super-next-icon,
    .ant-picker-super-prev-icon,
    .ant-picker-today-btn {
      color: var(--color-light-primary);
    }

    .ant-picker-content > thead > tr > th {
      color: var(--color-light-primary);
    }

    .ant-modal-footer {
      background: var(--color-dark-primary);
    }

    .ant-modal-close {
      color: var(--color-light-primary);
    }

    .ant-modal-close:hover {
      color: var(--color-monokle-primary);
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
  desktop: '2560px'
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
  desktopL: `(min-width: ${size.desktop})`
};
