import * as Sentry from '@sentry/react';
import { createBrowserRouter } from 'react-router-dom';

// React Router v6의 createBrowserRouter를 래핑하여 Sentry 통합을 추가
export const sentryCreateBrowserRouter = (
  routes: Parameters<typeof createBrowserRouter>[0],
  opts?: Parameters<typeof createBrowserRouter>[1],
) => {
  return Sentry.wrapCreateBrowserRouterV6(createBrowserRouter)(routes, opts);
};
