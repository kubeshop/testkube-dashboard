import {getApiEndpoint} from '@services/apiEndpoint';

let apiInfoData: any = {};

let features: {logsV2: boolean} = {logsV2: false};

export function getApiInfoData() {
  return apiInfoData;
}

export async function initializeApiInfoData() {
  // TODO: what to do if this request fails?
  const response = await fetch(`${getApiEndpoint()}/info`);
  const data = await response.json();
  apiInfoData = data ?? {};

  if ('features' in apiInfoData && typeof apiInfoData.features === 'object') {
    features = apiInfoData.features;
  }
}

export function isFeatureEnabled(feature: keyof typeof features) {
  return features[feature];
}
