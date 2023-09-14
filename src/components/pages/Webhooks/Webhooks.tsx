import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import WebhookDetails from './WebhookDetails/WebhookDetails';
import WebhooksList from './WebhooksList';

const Webhooks: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<WebhooksList />} />
        <Route path=":id">
          <Route path="settings" element={<WebhookDetails />}>
            <Route index element={null} />
            <Route path=":settingsTab" element={null} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Webhooks;
