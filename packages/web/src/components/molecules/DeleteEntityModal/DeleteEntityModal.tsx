import {useState} from 'react';

import {Input} from 'antd';

import {capitalize} from 'lodash';

import {FullWidthSpace, Text} from '@custom-antd';

import {useModal} from '@modal/hooks';

import {DeleteModal} from '@molecules';

import Colors from '@styles/Colors';

export interface DeleteEntityModalProps {
  onDelete: (id: string) => Promise<any>;
  name: string;
  entityLabel: string;
  defaultStackRoute: string;
  idToDelete?: string;
  onConfirm?: () => void;
}

const DeleteEntityModal: React.FC<DeleteEntityModalProps> = props => {
  const {onDelete, name, onConfirm, entityLabel, defaultStackRoute, idToDelete} = props;

  const {close} = useModal();
  const [checkName, setName] = useState('');

  return (
    <DeleteModal
      onDelete={onDelete}
      onClose={close}
      onConfirm={onConfirm}
      successMessage={`${capitalize(entityLabel)} was successfully deleted.`}
      defaultStackRoute={defaultStackRoute}
      idToDelete={idToDelete || name}
      actionDisabled={checkName !== name}
      data-testid="delete-entity-modal"
      deleteOnEnter
      content={
        <FullWidthSpace size={24} direction="vertical">
          <Text data-testid="delete-entity-title" className="regular middle" color={Colors.slate400}>
            Do you really want to delete this {entityLabel}?
            <br />
            All your historical and analytical data will also be removed.
          </Text>
          <Text data-testid="delete-entity-subtitle" className="regular middle" color={Colors.slate400}>
            Please enter the name of this {entityLabel} (<span style={{color: Colors.whitePure}}>{name}</span>) to
            delete it forever.
          </Text>
          <Input
            data-testid="delete-entity-input"
            placeholder={`${capitalize(entityLabel)} name`}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </FullWidthSpace>
      }
    />
  );
};

export default DeleteEntityModal;
