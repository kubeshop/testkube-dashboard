import React from 'react';
// import {RenderTestStatusSvgIcon, TestTypeIcon} from '@src/components/atoms';
// import {getDuration, timeStampToDate} from '@src/utils/formatDate';
// import {ReactComponent as LeftArrowIcon} from '@assets/arrowIcon.svg';

import {Table} from 'antd';
import {useDispatch} from 'react-redux';
// import {updateSelectedTestId} from '@src/redux/reducers/testsListSlice';

function TableHeader() {
  const dispatch = useDispatch();
  const {Column} = Table;

  return (
    <>
      <Column
        title="Type"
        dataIndex="scriptType"
        key="scriptType"
        width="10%"
        // render={(testType: string) => <TestTypeIcon testType={testType} width={30} height={30} />}
      />
      <Column title="Script" dataIndex="scriptName" key="scriptName" width="25%" />
      <Column title="Name" dataIndex="name" key="name" width="25%" />
      <Column
        title="Started At"
        dataIndex="startTime"
        key="startTime"
        width="15%"
        // render={(startTime: string) => (startTime ? timeStampToDate(startTime) : '-')}
      />
      <Column
        title="Duration"
        dataIndex="duration"
        key="duration"
        width="15%"
        // render={(duration: string, row: any) => (row.endTime ? getDuration(duration, row.endTime) : '-')}
      />
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        width="5%"
        // render={(testStatus: string) => <RenderTestStatusSvgIcon testStatus={testStatus} />}
      />
      <Column
        title="id"
        dataIndex="id"
        key="id"
        width="5%"
        // render={(id: string) => (
        //   <LeftArrowIcon height="13px" width="8x" onClick={() => dispatch(updateSelectedTestId(id))} />
        // )}
      />
    </>
  );
}

export default TableHeader;
