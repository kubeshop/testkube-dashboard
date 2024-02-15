import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {Artifact} from '@models/artifact';

import ArtifactsListItem from './ArtifactsListItem';

describe('ArtifactsListItem', () => {
  const artifact: Artifact = {
    executionName: 'execution-id-123',
    name: 'artifact-name',
    size: 123,
    status: 'ready',
  };
  const executionId = '123';

  function createAutoResetSpy(): jest.SpyInstance {
    const fetchMock = jest.fn(() => Promise.reject(new Error('mockImplementation required')));
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
      return {
        ok: true,
        status: 200,
        headers: new Headers({'content-type': 'application/json'}),
        json: () => Promise.resolve({}),
      };
    });
    const artifactItem = render(<ArtifactsListItem artifact={artifact} executionId={executionId} />);
    const itemContainer = artifactItem.getByTestId('artifact-list-item');
    await waitFor(() => {
      fireEvent.click(itemContainer);
    });
    expect(fetchMock).toBeCalledTimes(2);
  });
});
