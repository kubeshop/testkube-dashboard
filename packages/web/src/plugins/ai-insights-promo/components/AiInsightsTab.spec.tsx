import {render, screen} from '@testing-library/react';

import AiInsightsTab from './AiInsightsTab';

describe('AiInsightsTab', () => {
  it('should render the locked icon', () => {
    render(<AiInsightsTab />);
    const ossAiTab = screen.getByTestId('ai-insights-tab-oss');
    expect(ossAiTab).toBeInTheDocument();
  });

  it('should render the "This feature is available only in Testkube Pro." text', () => {
    render(<AiInsightsTab />);
    const text = screen.getByText(/This feature is available only in Testkube Pro./i);
    expect(text).toBeInTheDocument();
  });

  it('should render the "Start using Testkube Pro to get AI insights for your test executions, as well as other exclusive features." text', () => {
    render(<AiInsightsTab />);
    const text = screen.getByText(
      /Start using Testkube Pro to get AI insights for your test executions, as well as other exclusive features./i
    );
    expect(text).toBeInTheDocument();
  });

  it('should render the "Go to Testkube Pro" button', () => {
    render(<AiInsightsTab />);
    const button = screen.getByTestId('cloud-cta-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Go to Testkube Pro');
  });
});
