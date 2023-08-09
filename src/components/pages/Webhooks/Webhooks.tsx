import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import WebhooksList from './WebhooksList';

const Webhooks: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<WebhooksList />} />
        {/* <Route path=":id" element={<TriggerDetails />}>
          <Route index element={null} />
          <Route path="settings/:settingsTab" element={null} />
        </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Webhooks;
