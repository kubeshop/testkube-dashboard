import {FC} from 'react';

import {useModal} from '@modal/hooks';

import DeleteEntityModal from '@molecules/DeleteEntityModal';

import {CardForm} from '@organisms';

export interface DeleteProps {
  name: string;
  description: string;
  label: string;
  redirectUrl: string;
  onDelete: (id: string) => Promise<any>;
}

const Delete: FC<DeleteProps> = ({name, description, label, redirectUrl, onDelete}) => {
  const {open} = useModal({
    title: `Delete this ${label}`,
    width: 600,
    content: <DeleteEntityModal defaultStackRoute={redirectUrl} onDelete={onDelete} name={name} entityLabel={label} />,
  });

  return (
    <CardForm
      name="delete-entity-form"
      title={`Delete this ${label}`}
      description={description}
      confirmLabel="Delete"
      isWarning
      onConfirm={open}
      monitLeave={false}
      wasTouched
    />
  );
};

export default Delete;
