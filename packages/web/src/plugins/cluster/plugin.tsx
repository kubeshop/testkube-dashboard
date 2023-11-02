import React, {useEffect} from 'react';

import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {useModal} from '@modal/hooks';

import {EndpointModal, notificationCall} from '@molecules';

import type ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import type GeneralPlugin from '@plugins/general/plugin';
import type RouterPlugin from '@plugins/router/plugin';

import {getApiDetails, getApiEndpoint, isApiEndpointLocked} from '@services/apiEndpoint';

import {
  initializeClusterDetailsStore,
  useClusterDetails,
  useClusterDetailsField,
  useClusterDetailsPick,
  useClusterDetailsSync,
} from '@store/clusterDetails';

const generalStub = external<typeof GeneralPlugin>();
const routerStub = external<typeof RouterPlugin>();
const clusterStatusStub = external<typeof ClusterStatusPlugin>();

export default createPlugin('dashboard/cluster')
  .needs(routerStub.data('location'))
  .needs(generalStub.data('useApiEndpoint'))
  .needs(clusterStatusStub.data('isClusterAvailable'))

  .provider(({useData}) => (
    <StoreProvider store={initializeClusterDetailsStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useClusterDetails, useClusterDetailsPick, useClusterDetailsField, useClusterDetailsSync})

  .provider(({useData}) => {
    const {useApiEndpoint, location, isClusterAvailable} = useData.pick(
      'useApiEndpoint',
      'location',
      'isClusterAvailable'
    );
    const apiEndpoint = useApiEndpoint();
    const {setClusterDetails} = useClusterDetailsPick('setClusterDetails');

    const {open: openEndpointModal} = useModal({
      title: 'Testkube API endpoint',
      width: 693,
      content: <EndpointModal />,
      dataTestCloseBtn: 'endpoint-modal-close-button',
      dataTestModalRoot: 'endpoint-modal',
    });

    useEffect(() => {
      // Do not fire the effect if new endpoint is just being set up.
      if (location.pathname === '/apiEndpoint') {
        return;
      }

      if (!apiEndpoint && !isApiEndpointLocked()) {
        openEndpointModal();
        return;
      }

      // Avoid loading API details when we know the cluster is not available.
      if (!isClusterAvailable) {
        return;
      }

      getApiDetails(apiEndpoint!)
        .then(setClusterDetails)
        .catch(() => {
          // Handle race condition
          if (getApiEndpoint() !== apiEndpoint) {
            return;
          }

          // Display popup
          notificationCall('failed', 'Could not receive data from the specified API endpoint');
          if (!isApiEndpointLocked()) {
            openEndpointModal();
          }
        });
    }, [apiEndpoint, isClusterAvailable]);
  })

  .init();
