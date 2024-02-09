import {createGlobalStyle} from 'styled-components';

import Colors, {BackgroundColors} from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

export const invisibleScroll = `
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari and Opera */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const GlobalStyle = createGlobalStyle`
  #root, html, body {
    height: initial;
    min-height: 100vh;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
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

  @keyframes opacity-in {
    0%, 30% {
      opacity: 0;
    }

    100% {
      opacity: 1;
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

      @media ${maxDevice.tablet} {
        margin-bottom: 25px;
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

  .ant-table-row .ant-table-column-sort {
    background-color: transparent;
  }

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

  .light-dropdown{
    .ant-dropdown-menu {
      background: ${Colors.slate900};

      .ant-dropdown-menu-item {
        background: ${Colors.slate700};
      }
    }

    .ant-dropdown-menu-item-divider {
      margin: 0;
      background-color: ${Colors.slate500};
    }
  }

  .ant-dropdown-menu {
    padding: 0;

    .ant-dropdown-menu-item {
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

  /* Drawer */

  .ant-drawer:not(.ant-drawer-open) .ant-drawer-mask,
  .ant-drawer:not(.ant-drawer-open) .ant-drawer-content-wrapper {
    pointer-events: none;
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

  /* Steps */
  .ant-steps-item-active {
    .ant-steps-item-container {
      .ant-steps-item-content {
        .ant-steps-item-title {
          color: ${Colors.indigo400};
        }
      }
    }
  }

  .ant-steps-item-wait {
    .ant-steps-item-container {
      .ant-steps-item-icon {

        border-color: ${Colors.slate500};

        .ant-steps-icon {
          color: ${Colors.slate500};
        }

      }

      .ant-steps-item-content {
        .ant-steps-item-title {
          color: ${Colors.slate500};
        }
      }
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-container {
      .ant-steps-item-content {
        .ant-steps-item-title {
          color: ${Colors.indigo400};
        }
      }
    }
  }

  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
    background-color: transparent;
    border: 1px dashed ${Colors.slate500};
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-flow__edge-path, .react-flow__connection-path {
    stroke: ${Colors.indigo400};
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-flow__handle {
    border: 2px solid ${Colors.indigo900};
    background: ${Colors.indigo400};
    width: 10px;
    height: 10px;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-flow__attribution {
    display: none;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-flow__controls-button {
    width: 30px;
    height: 30px;

    border-bottom: 0;
    background: ${Colors.slate800};

    &:hover {
      background-color: ${Colors.slate700};

      svg {
        fill: ${Colors.indigo400}
      }
    }

    transition: 0.3s all;

    svg {
      fill: ${Colors.whitePure};
    }
  }

  /* Calendar */
  .ant-picker-panel-container {
    border: 1px solid ${Colors.slate800};
  }

  .ant-picker-time-panel-column > li.ant-picker-time-panel-cell .ant-picker-time-panel-cell-inner:hover {
    background: ${Colors.slate400};
  }

  
`;
