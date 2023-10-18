import React from 'react';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import ArtifactsListItem from './ArtifactsListItem';

describe('ArtifactsListItem', () => {
  const artifact = {
    description: 'artifact-description',
    name: 'artifact-name',
    size: 123,
  };
  const executionId = '123';
  const testName = 'test-name';
  const testSuiteName = 'test-suite-name';

  function createAutoResetSpy(): jest.SpyInstance {
    const fetchMock = jest.fn();
    beforeEach(() => {
      fetchMock.mockReset();
    });
    return fetchMock;
  }

  function mockFetchEach(): jest.SpyInstance {
    const prevFetch = global.fetch;
    const fetchMock = createAutoResetSpy();
    beforeEach(() => {
      // @ts-ignore: mocking
      global.fetch = fetchMock;
    });
    afterEach(() => {
      global.fetch = prevFetch;
    });

    return fetchMock;
  }

  const fetchMock = mockFetchEach();

  it('renders the artifact name', () => {
    render(<ArtifactsListItem artifact={artifact} executionId={executionId} />);
    const artifactName = screen.getByText(artifact.name);
    expect(artifactName).toBeInTheDocument();
  });

  it('renders the artifact type icon', () => {
    render(<ArtifactsListItem artifact={artifact} executionId={executionId} />);
    const artifactTypeIcon = screen.getByTestId('artifact-type-icon');
    expect(artifactTypeIcon).toBeInTheDocument();
  });

  it('calls downloadArtifact when download icon is clicked', async () => {
    fetchMock.mockImplementationOnce(async () => {
      return {json: Promise.resolve({}), ok: true};
    });
    const artifactItem = render(<ArtifactsListItem artifact={artifact} executionId={executionId} />);
    const itemContainer = artifactItem.getByTestId('artifact-list-item');
    await waitFor(() => {
      fireEvent.click(itemContainer);
    });
    expect(fetchMock).toBeCalledTimes(1);
  });
});
