import ApiEndpoint from './ApiEndpoint';
import ConnectCloud from './ConnectCloud';
import YourInstallation from './YourInstallation';

const GeneralSettings = () => {
  return (
    <>
      <ApiEndpoint />
      <YourInstallation />
      <ConnectCloud />
    </>
  );
};

export default GeneralSettings;
