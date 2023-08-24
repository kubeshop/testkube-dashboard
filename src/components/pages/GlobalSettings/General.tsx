import {ApiEndpoint} from './General/ApiEndpoint';
import {ConnectCloud} from './General/ConnectCloud';
import {YourInstallation} from './General/YourInstallation';

export const GeneralSettings = () => {
  return (
    <>
      <ApiEndpoint />
      <YourInstallation />
      <ConnectCloud />
    </>
  );
};
