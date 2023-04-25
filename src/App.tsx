import {lazy, useRef} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {EndpointProcessing, NotFound} from '@pages';

import {isApiEndpointLocked} from '@services/apiEndpoint';
import LogOutputHeader from '@molecules/LogOutput/LogOutputHeader';
import FullScreenLogOutput from '@molecules/LogOutput/FullscreenLogOutput';
import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';
import {EndpointModal} from '@molecules';

const Tests = lazy(() => import('@pages').then(module => ({default: module.Tests})));
const TestSuites = lazy(() => import('@pages').then(module => ({default: module.TestSuites})));
const Executors = lazy(() => import('@pages').then(module => ({default: module.Executors})));
const Sources = lazy(() => import('@pages').then(module => ({default: module.Sources})));
const Triggers = lazy(() => import('@pages').then(module => ({default: module.Triggers})));
const GlobalSettings = lazy(() => import('@pages').then(module => ({default: module.GlobalSettings})));

const App: React.FC<any> = ({setEndpointModalState, isEndpointModalVisible = false}) => {
  const {isFullScreenLogOutput, logOutput} = useAppSelector(selectFullScreenLogOutput);
  const logRef = useRef<HTMLDivElement>(null);

  return <>
    <EndpointModal visible={isEndpointModalVisible} setModalState={setEndpointModalState} />
    <Routes>
      <Route path="tests/*" element={<Tests />} />
      <Route path="test-suites/*" element={<TestSuites />} />
      <Route path="executors/*" element={<Executors />} />
      <Route path="sources/*" element={<Sources />} />
      <Route path="triggers" element={<Triggers />} />
      <Route path="settings" element={<GlobalSettings />} />
      <Route
        path="/apiEndpoint"
        element={isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />}
      />
      <Route path="/" element={<Navigate to="/tests" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    {isFullScreenLogOutput ? <LogOutputHeader logOutput={logOutput} isFullScreen /> : null}
    <CSSTransition nodeRef={logRef} in={isFullScreenLogOutput} timeout={1000} classNames="full-screen-log-output" unmountOnExit>
      <FullScreenLogOutput ref={logRef} logOutput={logOutput} />
    </CSSTransition>
  </>;
};

export default App;
