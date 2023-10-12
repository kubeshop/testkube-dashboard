import {useState} from 'react';

import {Input} from 'antd';

import {capitalize} from 'lodash';

import {FullWidthSpace, Text} from '@custom-antd';

import {DeleteModal} from '@molecules';

import Colors from '@styles/Colors';

const DeleteEntityModal: React.FC<{
  onClose: () => void;
  onDelete: (id: string) => Promise<any>;
  name: string;
  entityLabel: string;
  defaultStackRoute: string;
  idToDelete?: string;
  onConfirm?: () => void;
}> = props => {
  const {onDelete, name, onClose, onConfirm, entityLabel, defaultStackRoute, idToDelete} = props;

  const [checkName, setName] = useState('');

  return (
    <DeleteModal
      onDelete={onDelete}
      onClose={onClose}
      onConfirm={onConfirm}
      successMessage={`${capitalize(entityLabel)} was successfully deleted.`}
      defaultStackRoute={defaultStackRoute}
      idToDelete={idToDelete || name}
      actionDisabled={checkName !== name}
      deleteOnEnter
      content={
        <FullWidthSpace size={24} direction="vertical">
          <Text className="regular middle" color={Colors.slate400}>
            Do you really want to delete this {entityLabel}?
            <br />
            All your historical and analytical data will also be removed.
          </Text>
          <Text className="regular middle" color={Colors.slate400}>
            Please enter the name of this {entityLabel} (<span style={{color: Colors.whitePure}}>{name}</span>) to
            delete it forever.
          </Text>
          <Input
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
