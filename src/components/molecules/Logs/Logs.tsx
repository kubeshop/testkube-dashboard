import React from 'react';
import {nanoid} from '@reduxjs/toolkit';

import {
  StyledPlainTextOutputContainer,
  StyledTestOutput,
  StyledText,
} from '../ExecutionResultsOutputs/ExecutionResultsOutputs.styled';

type MyProps = {
  // using `interface` is also ok
  id: string;
};

type MyState = {
  log: string;
};

class Logs extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {log: ''};
  }

  componentDidMount() {
    const {id} = this.props;

    // TODO pass uri form some global
    const evtSource = new EventSource(`https://demo.testkube.io/results/v1/executions/${id}/logs`);

    evtSource.onmessage = event => {
      const json = JSON.parse(event.data);
      this.setState(prev => {
        return {log: `${prev.log}\n${json.content}`};
      });
    };
  }

  render() {
    const {log} = this.state;

    return (
      <>
        <StyledPlainTextOutputContainer>
          <StyledTestOutput>
            {log && (
              <StyledText key={nanoid()}>
                <pre>{log}</pre>
              </StyledText>
            )}
          </StyledTestOutput>
        </StyledPlainTextOutputContainer>
      </>
    );
  }
}

export default Logs;
