import {createGlobalStyle} from 'styled-components';

import Colors, {BackgroundColors} from '@styles/Colors';

export const invisibleScroll = `
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari and Opera */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    height: 100%;
  }

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

  .ant-layout {
    min-height: 100vh;

    .ant-layout {
      min-height: initial;
    }
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

  .ant-tabs-content-holder .ant-tabs-content {
    height: 100%;
  }

  .ant-avatar {
    display: flex;

    overflow: unset;
  }

  .ant-empty-description {
    color: ${Colors.slate200};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  /* Tabs */

  .ant-tabs {
    color: ${Colors.slate400};

    font-weight: 500;

    .ant-tabs-nav {
      margin-bottom: 40px;

      &::before {
        border-bottom: unset !important;
      }
    }
  }

  /* Select */

  .ant-select-arrow {
    color: ${Colors.slate500};
  }

  .ant-select-clear {
    color: ${Colors.slate500};
  }

  .ant-select-multiple .ant-select-selection-item-remove {
    color: ${Colors.slate200};
    margin-top: 1px;
    margin-left: 2px;
  }

  /* Input */

  .ant-input-password-icon.anticon {
    color: ${Colors.slate500};

    &:hover {
      color: ${Colors.slate500};
    }
  }

  /* Notification */

  .ant-notification-notice {
    overflow: unset;
  }

  /* Table */

  .ant-table-thead .ant-table-cell {
    background-color: ${Colors.slate800};
    color: ${Colors.slate400};

    font-weight: 400;
  }

  .ant-table table {
    border: 1px solid ${Colors.slate800};
  }

  .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: ${Colors.slate800halfalpha};
  }

  .no-row-border {
    .ant-table-tbody > tr > td {
      border: 0;
    }
  }

  .custom-table {
    .ant-table-tbody > tr > td {
      border-radius: 4px;

      border: 1px solid ${Colors.slate800};
      border-top-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;

      transition: 0.3s;
      cursor: pointer;

      &:hover {
        border: 1px solid ${Colors.purple};
      }
    }

    .ant-table-tbody > tr.ant-table-row-selected > td {
      border: 1px solid ${Colors.purple};

      transition: 0.3s;
    }

    table tr td.ant-table-selection-column {
      display: none;
    }
  }

  /* Dropdown */

  .ant-dropdown-menu {
    background: ${Colors.slate800};
    padding: 0;

    .ant-dropdown-menu-item {
      background: ${Colors.slate700};

      &:hover {
        background: transparent;
      }
    }
  }


  /* Pagination */

  .ant-table-pagination.ant-pagination {
    margin: 0 !important;
    padding: 32px 0 !important;
  }

  .ant-pagination-item {
    border: 1px solid ${Colors.greyBorder};

    background: ${Colors.slate900};

    a {
      color: #dbdbdb;
    }

    &-active {
      border-color: ${Colors.purple};

      a {
        color: ${Colors.purple};
      }
    }

    &:hover {
      border-color: ${Colors.purple};

      a {
        color: ${Colors.purple};
      }
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      border: 1px solid ${Colors.greyBorder};

      color: #dbdbdb;
      background: transparent;

      span {
        path {
          fill: #dbdbdb;
        }
      }
    }

    &:hover {
      .ant-pagination-item-link {
        border-color: ${Colors.purple};

        color: ${Colors.purple};
        background: transparent;
      }

      span {
        path {
          fill: ${Colors.purple};
        }
      }
    }
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link {
      border: 1px solid ${Colors.greyBorder} !important;

      background: #262626 !important;

      span {
        path {
          fill: ${Colors.greyBorder};
        }
      }
    }
  }

  .ant-table {
    background: transparent;
  }

  .ant-pagination-item-container {
    .ant-pagination-item-link-icon,
    .ant-pagination-item-ellipsis {
      color: ${Colors.purple} !important;
    }
  }

  .ant-page-header-heading-title {
    line-height: 38px !important;
  }

  .ant-form-item-optional {
    color: ${Colors.whitePure} !important;
  }

  .ant-dropdown-menu-item.ant-dropdown-menu-item-active {
    background-color: ${Colors.slate700};
  }

  .ant-select-item-group {
    color: ${Colors.slate400};
    text-transform: uppercase;
  }

  .ant-select-disabled {
    .ant-select-selector {
      border-color: ${Colors.slate800} !important;
    }

    .ant-select-selection-item {
      color: ${Colors.slate500};
    }
  }
  
  /* Popover */

  /* stylelint-disable selector-class-pattern */
  .ant-popover-placement-rightBottom {
    .ant-popover-arrow  {
      bottom: 4px;
    }
  }

  /* Form */

  .ant-form-vertical {
    .ant-form-item-required {
      &::before {
        margin-left: 2px;
        margin-right: unset !important;
        order: 1;
      }
    }
  }

  .ant-form-item-label > label .ant-form-item-tooltip {
    color: inherit;
  }

  /* Popover */

  .ant-popover-inner-content {
    padding: 0;
  }

  /* Segmented */

  .ant-segmented {
    padding: 0;
    border: 1px solid ${Colors.slate600};
  }

  .ant-segmented-item {
    font-size: 12px !important;
    line-height: 16px;
    letter-spacing: 0.05em;
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
