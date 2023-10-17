import React, {FC} from 'react';

import {fireEvent, render, waitFor} from '@testing-library/react';

import DashboardContext from '@contexts/DashboardContext';

import ModalContext from '@modal/context';

import {mockDashboardContextValue, mockModalContextValue} from '@utils/mocks';

import DeleteEntityModal, {DeleteEntityModalProps} from './DeleteEntityModal';

describe('DeleteEntityModal', () => {
  let onDelete: jest.Mock;
  const onConfirm = jest.fn();
  const entityLabel = 'item';
  const defaultStackRoute = '/items';
  const name = 'Test Item';
  const idToDelete = 'test-item-id';

  beforeEach(() => {
    onDelete = jest.fn().mockImplementation(() => Promise.resolve());
  });

  const DeleteEntityModalWrapper: FC<DeleteEntityModalProps> = props => (
    <DashboardContext.Provider value={mockDashboardContextValue}>
      <ModalContext.Provider value={mockModalContextValue}>
        <DeleteEntityModal {...props} />
      </ModalContext.Provider>
    </DashboardContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with the correct content', async () => {
    const {getByTestId} = render(
      <DeleteEntityModalWrapper
        onDelete={onDelete}
        onConfirm={onConfirm}
        entityLabel={entityLabel}
        defaultStackRoute={defaultStackRoute}
        name={name}
        idToDelete={idToDelete}
      />
    );

    expect(getByTestId('delete-entity-title')).toBeInTheDocument();
    expect(getByTestId('delete-entity-subtitle')).toBeInTheDocument();
    expect(getByTestId('delete-entity-input')).toBeInTheDocument();
  });

  it('should disable the delete button if the entered name does not match the entity name', async () => {
    const {getByTestId} = render(
      <DeleteEntityModalWrapper
        onDelete={onDelete}
        onConfirm={onConfirm}
        entityLabel={entityLabel}
        defaultStackRoute={defaultStackRoute}
        name={name}
        idToDelete={idToDelete}
      />
    );

    const input = getByTestId(`delete-entity-input`);
    const deleteButton = getByTestId('delete-action-btn');

    fireEvent.change(input, {target: {value: 'Wrong Name'}});
    expect(deleteButton).toBeDisabled();

    fireEvent.change(input, {target: {value: name}});
    expect(deleteButton).not.toBeDisabled();
  });

  it('should call onDelete when the delete button is clicked with the correct id', async () => {
    const {getByTestId} = render(
      <DeleteEntityModalWrapper
        onDelete={onDelete}
        onConfirm={onConfirm}
        entityLabel={entityLabel}
        defaultStackRoute={defaultStackRoute}
        name={name}
        idToDelete={idToDelete}
      />
    );

    const input = getByTestId(`delete-entity-input`);
    const deleteButton = getByTestId('delete-action-btn');

    fireEvent.change(input, {target: {value: name}});
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(idToDelete);
    });
  });

  it('should call onConfirm when the delete is successful', async () => {
    const {getByTestId} = render(
      <DeleteEntityModalWrapper
        onDelete={onDelete}
        onConfirm={onConfirm}
        entityLabel={entityLabel}
        defaultStackRoute={defaultStackRoute}
        name={name}
        idToDelete={idToDelete}
      />
    );

    const input = getByTestId(`delete-entity-input`);
    const deleteButton = getByTestId('delete-action-btn');

    fireEvent.change(input, {target: {value: name}});
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });
});
