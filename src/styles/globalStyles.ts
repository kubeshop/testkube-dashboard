import {createGlobalStyle} from 'styled-components';

import Colors from './Colors';

export const GlobalStyle = createGlobalStyle`

html {
  font-size: 16px;
}
body {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: var(--color-dark-primary);
  color: var(--color-gray-tertiary);
  font-family: var(--font-family-sans);
  box-sizing: border-box;
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
  color: ${Colors.blue6};
}

.ant-collapse-header {
  background: var(--color-gray-dark);
}

.ant-collapse-item {
  border-bottom: hidden;
}

.ant-collapse {
  width: 100%;
}

.ant-collapse-header {
  color: var(--color-light-primary);
}

.ant-collapse-borderless > .ant-collapse-item:last-child .ant-collapse-header {
  display: flex;
  width: 100%;
  height: 38px;
  color: var(--color-light-primary);
  background: var(--color-dark-tertiary);
}

.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
  transform: rotate(90deg);
  position: absolute;
  top: 40%;
  color: var(--color-light-primary);
}

.ant-collapse-content {
  width: 100%;
}

.ant-modal-header {
  background: var(--color-dark-primary);
}

.ant-modal-title {
  color: var(--color-light-primary);
  font-size: var(--font-size-lg);
}

@media screen and (min-width: 160rem) {
  .ant-modal-content {
    width: 600px;
  }
};
.ant-modal-wrap {
  overflow: unset !important;
}

.ant-collapse {
  background: inherit;
}

.ant-collapse .ant-collapse-borderless .ant-collapse-icon-position-right {
height: 38px;
}

.ant-picker-footer {
  display: none;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: ${Colors.blue6} !important;
  }

  .ant-menu-inline {
     border-right: none;
  }

  .ant-picker-suffix,
  .ant-picker-separator,
  .ant-picker-input>input::placeholder {
    color: var(--color-dark-quaternary);
  }

   .ant-table-thead > tr >th{
        color: var(--color-gray-primary);
       border: none;
        background: var(--color-dark-quinary);
      }
   .ant-table-thead > tr >td{
        color: var(--color-dark-tertiary);
        border: 1px solid var(--color-gray-nonary);
        background: var(--color-dark-quaternary);
      }

      .ant-table-tbody  > tr{
 border: 1px solid var(--color-gray-nonary);
      }
  .table-row-dark {
    background: var(--color-dark-tertiary);
    border: 1px solid red !important;
    color: var(--color-gray-primary);
    font-size: 14px;
  }

  .ant-table-tbody > tr > td {
    border-bottom: var(--color-dark-senary);
  }

  tr.ant-table-row:hover > td {
    background: var(--color-dark-senary) !important;
    font-size: 14px;
    cursor: pointer;
}
  tr.ant-table-row:active > td {
    background: var(--color-dark-senary) !important;
    color: var(--color-light-primary) !important;
    font-size: 14px;
}

.anticon{
  color: white;
}

.ant-tabs-top > .ant-tabs-nav::before {
  border-bottom: none;
}

.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: var(--color-dark-septenary);
}

 .ant-tabs-ink-bar {
  background: var(--color-gray-octonary);
}


.ant-tabs-tab-btn {
  color: var(--color-gray-octonary);
}

.ant-tabs-tab-btn:focus {
  color: var(--color-gray-octonary)
}

.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--color-gray-primary);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.ant-layout {
  background: var(--color-dark-tertiary);
}

.ring-progress-style {
   display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.g2-html-annotation {
  color: var(--color-light-primary) !important;
  /* font-size: 56px!important; */
  word-break: break-all;
}

.ant-tabs-tabpane {
  display: flex;
}

input[type=checkbox] {
  width: 15px !important;
  height: 15px !important;
  filter: grayscale(1);
  outline: 1px solid #434343;
  margin: 10px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 1em;
}

.filter-failed-checkbox {
  filter: hue-rotate(0deg)
}

.ant-table-placeholder > .ant-table-cell:hover {
  background: var(--color-gray-senary) !important;
}
.ant-table-empty .ant-table-tbody > tr.ant-table-placeholder {
  background: var(--color-gray-senary);
}

.ant-empty-description {
  color: var(--color-gray-primary);
}

.ant-tabs-tabpane:last-child {
  flex-direction: column;
}

.g2-tooltip {
  background: var(--color-dark-primary) !important;
  color: var(--color-gray-primary) !important;
}

.ant-pagination-item,
.ant-pagination-item-active,
.ant-pagination-item-link
.ant-select-selector,
.ant-select-selector,
.ant-select-selection-item
.ant-select-item-option-active,
.ant-pagination-item-link,
.ant-select-item,
.ant-pagination-item, .ant-pagination-item-active,
.ant-pagination-item > a,
.ant-select:not(.ant-select-customize-input) .ant-select-selector,
.ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link{
  background: var(--color-dark-senary) !important;
  border: 1px solid var(--color-dark-primary) !important;
  color: var(--color-gray-primary) !important;
}

.ant-collapse-header {
  display: flex;
  align-items: center;
}

.ant-table {
  background: transparent;
}

.ant-table,
.ant-table-thead > tr,
.ant-table-row {
  border: 1px solid var(--color-gray-nonary) !important;
}

.ant-pagination-item-container {
  display: none;
}

.ant-table-row:hover .table-actions-dropdown-container {
  display: block;
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
