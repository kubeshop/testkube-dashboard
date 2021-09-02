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
  `;

export default GlobalStyle;
