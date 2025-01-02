import PrivateRoute from '@src/components/common/routes/PrivateRoute';
import PublicRoute from '@src/components/common/routes/PublicRoute';
import { APIErrorBoundary } from '@src/components/error/boundary/APIErrorBoundary';
import { UnknowErrorBoundary } from '@src/components/error/boundary/UnknowErrorBoundary';
import { GlobalLoading } from '@src/components/loading/GlobalLoading';
import { PATH, ROUTE_TYPE } from '@src/constants/path';
import SignInPage from '@src/pages/auth/SignInPage';
import SignUpPage from '@src/pages/auth/SignUpPage';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';
import LandingPage from '@src/pages/landing/LandingPage';
import MyPage from '@src/pages/mypage/MyPage';
import { Suspense } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

const createAuthRouter = (routeType: ROUTE_TYPE, children: RouteObject[]) => {
  const authRouter = children.map((child: RouteObject) => ({
    element: routeType === 'PRIVATE' ? <PrivateRoute /> : <PublicRoute />,
    children: [child],
  }));
  return authRouter;
};

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <UnknowErrorBoundary>
        <APIErrorBoundary>
          <Suspense fallback={<GlobalLoading />}>
            <Outlet />
          </Suspense>
        </APIErrorBoundary>
      </UnknowErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      ...createAuthRouter('PUBLIC', [
        {
          path: PATH.SIGN_IN,
          element: <SignInPage />,
        },
        {
          path: PATH.SIGN_UP,
          element: <SignUpPage />,
        },
      ]),
      ...createAuthRouter('PRIVATE', [
        {
          path: PATH.MY_PAGE,
          element: <MyPage />,
        },
      ]),
      {
        path: '*',
        element: <SomethingWrongErrorPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
