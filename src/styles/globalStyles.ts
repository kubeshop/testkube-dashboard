import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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

  `;

export default GlobalStyle;
