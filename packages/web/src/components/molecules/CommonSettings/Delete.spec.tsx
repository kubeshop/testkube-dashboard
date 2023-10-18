import React from 'react';
import {UNSAFE_NavigationContext as NavigationContext} from 'react-router-dom';

import {fireEvent, render, waitFor} from '@testing-library/react';

import DashboardContext from '@contexts/DashboardContext';

import ModalContext from '@modal/context';

import {mockDashboardContextValue, mockModalContextValue, mockNavigationContextValue} from '@utils/mocks';

import Delete, {DeleteProps} from './Delete';

describe('Delete', () => {
  const onDelete = jest.fn();
  const redirectUrl = '/redirect';
  const name = 'test-entity';
  const description = 'This is a test';
  const label = 'Test';

  const DeleteWrapper: React.FC<DeleteProps> = props => (
    <DashboardContext.Provider value={mockDashboardContextValue}>
      <NavigationContext.Provider value={mockNavigationContextValue}>
        <ModalContext.Provider value={mockModalContextValue}>
          <Delete {...props} />
        </ModalContext.Provider>
      </NavigationContext.Provider>
    </DashboardContext.Provider>
  );

  const OpenDialogWrapper: React.FC<DeleteProps> = props => (
    <DashboardContext.Provider value={mockDashboardContextValue}>
      <NavigationContext.Provider value={mockNavigationContextValue}>
        <ModalContext.Provider value={{...mockModalContextValue, open: true}}>
          <Delete {...props} />
        </ModalContext.Provider>
      </NavigationContext.Provider>
    </DashboardContext.Provider>
  );

  it('should render the component', () => {
    const {getByTestId} = render(
      <DeleteWrapper
        name={name}
        description={description}
        label={label}
        redirectUrl={redirectUrl}
        onDelete={onDelete}
      />
    );

    expect(getByTestId('delete-entity-form')).toBeInTheDocument();
    expect(getByTestId('delete-entity-form-card-title')).toContainHTML(`Delete this Test`);
    expect(getByTestId('delete-entity-form-card-description')).toContainHTML('This is a test');
    expect(getByTestId('configuration-card-confirm-button')).toContainHTML('Delete');
  });

  it('should open the delete modal when clicked', async () => {
    jest.spyOn(mockModalContextValue, 'setOpen').mockImplementation().mockClear();
    const {getByTestId} = render(
      <DeleteWrapper
        name={name}
        description={description}
        label={label}
        redirectUrl={redirectUrl}
        onDelete={onDelete}
      />
    );

    const deleteButton = getByTestId('configuration-card-confirm-button');
    await waitFor(() => fireEvent.click(deleteButton));
    expect(mockModalContextValue.setOpen).toBeCalledTimes(1);
  });
});
