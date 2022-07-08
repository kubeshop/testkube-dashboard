import {Title} from '@custom-antd';

const EntityListContainer: React.FC<any> = props => {
  const {pageTitle, pageDescription} = props;

  return (
    <>
      <Title>{pageTitle}</Title>
      <div>{pageDescription}</div>
    </>
  );
};

export default EntityListContainer;
