import {fireEvent, render, waitFor} from '@testing-library/react';

import DeleteModal from './DeleteModal';

describe('DeleteModal', () => {
  const onDelete = jest.fn();
  const onClose = jest.fn();
  const successMessage = 'Item deleted successfully';
  const idToDelete = '123';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title and subtitle', () => {
    const {getByText} = render(
      <DeleteModal
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
        title="Delete Item"
        subtitle="Are you sure you want to delete this item?"
      />
    );

    expect(getByText('Delete Item')).toBeInTheDocument();
    expect(getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  it('calls onDelete when the delete button is clicked', async () => {
    const {getByText} = render(
      <DeleteModal onDelete={onDelete} onClose={onClose} successMessage={successMessage} idToDelete={idToDelete} />
    );

    fireEvent.click(getByText('Delete'));

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(idToDelete);
    });
  });

  it('disables the delete button when actionDisabled is true', () => {
    const {getByText} = render(
      <DeleteModal
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
        actionDisabled
      />
    );

    expect(getByText('Delete')).toBeDisabled();
  });

  it('calls onConfirm when provided after successful deletion', async () => {
    const onConfirm = jest.fn();
    const {getByText} = render(
      <DeleteModal
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(getByText('Delete'));

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(idToDelete);
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  it('navigates back when defaultStackRoute is provided after successful deletion', async () => {
    const defaultStackRoute = '/items';
    const {getByText} = render(
      <DeleteModal
        onDelete={onDelete}
        onClose={onClose}
        successMessage={successMessage}
        idToDelete={idToDelete}
        defaultStackRoute={defaultStackRoute}
      />
    );

    fireEvent.click(getByText('Delete'));

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(idToDelete);
      expect(onClose).toHaveBeenCalled();
      expect(window.location.pathname).toEqual(defaultStackRoute);
    });
  });

  it('calls onClose when the cancel button is clicked', () => {
    const {getByText} = render(
      <DeleteModal onDelete={onDelete} onClose={onClose} successMessage={successMessage} idToDelete={idToDelete} />
    );

    fireEvent.click(getByText('Cancel'));

    expect(onClose).toHaveBeenCalled();
  });
});
