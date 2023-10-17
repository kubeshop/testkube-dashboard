import {FC} from 'react';

import {fireEvent, render, waitFor} from '@testing-library/react';

import DashboardContext from '@contexts/DashboardContext';

import {mockDashboardContextValue} from '@utils/mocks';

import DeleteModal, {DeleteModalProps} from './DeleteModal';

const DeleteModalWrapper: FC<DeleteModalProps> = props => (
  <DashboardContext.Provider value={mockDashboardContextValue}>
    <DeleteModal {...props} />
  </DashboardContext.Provider>
);

describe('DeleteModal', () => {
  let onDelete: jest.Mock;
  const onClose = jest.fn();
  const successMessage = 'Item deleted successfully';
  const idToDelete = '123';

  beforeEach(() => {
    onDelete = jest.fn().mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title and subtitle', () => {
    const {getByTestId} = render(
      <DeleteModalWrapper
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
        title="Delete Item"
        subtitle="Are you sure you want to delete this item?"
      />
    );

    expect(getByTestId('delete-content-title')).toBeInTheDocument();
    expect(getByTestId('delete-content-subtitle')).toBeInTheDocument();
  });

  it('calls onDelete when the delete button is clicked', async () => {
    const {getByTestId} = render(
      <DeleteModalWrapper
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
      />
    );

    fireEvent.click(getByTestId('delete-action-btn'));

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(idToDelete);
    });
  });

  it('disables the delete button when actionDisabled is true', () => {
    const {getByTestId} = render(
      <DeleteModalWrapper
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
        actionDisabled
      />
    );

    expect(getByTestId('delete-action-btn')).toBeDisabled();
  });

  it('calls onConfirm when provided after successful deletion', async () => {
    const onConfirm = jest.fn();
    const {getByTestId} = render(
      <DeleteModalWrapper
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(getByTestId('delete-action-btn'));

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(idToDelete);
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  it('calls onClose when the cancel button is clicked', () => {
    const {getByTestId} = render(
      <DeleteModalWrapper
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
      />
    );

    fireEvent.click(getByTestId('delete-cancel-btn'));

    expect(onClose).toHaveBeenCalled();
  });
});
