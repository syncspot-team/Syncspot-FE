import PrivateRoute from '@src/components/common/routes/PrivateRoute';
import PublicRoute from '@src/components/common/routes/PublicRoute';
import { APIErrorBoundary } from '@src/components/error/boundary/APIErrorBoundary';
import { UnknowErrorBoundary } from '@src/components/error/boundary/UnknowErrorBoundary';
import { GlobalLoading } from '@src/components/loading/GlobalLoading';
import { PATH, ROUTE_TYPE } from '@src/constants/path';
import { Suspense } from 'react';
import HelpIdInquiryPage from '@src/pages/auth/HelpIdInquiryPage';
import HelpPwInquiryPage from '@src/pages/auth/HelpPwInquiryPage';
import SignInPage from '@src/pages/auth/SignInPage';
import SignUpPage from '@src/pages/auth/SignUpPage';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';
import LandingPage from '@src/pages/landing/LandingPage';
import MyPage from '@src/pages/mypage/MyPage';
import OnBoardingPage from '@src/pages/onboarding/OnBoardingPage';
import LocationEnterPage from '@src/pages/location/LocationEnterPage';
import LocationResultPage from '@src/pages/location/LocationResultPage';
import LocationRecommendationsPage from '@src/pages/location/LocationRecommendationsPage';
import PlaceCreatePage from '@src/pages/place/PlaceCreatePage';
import PlaceVotePage from '@src/pages/place/PlaceVotePage';
import PlaceResultPage from '@src/pages/place/PlaceResultPage';
import TimeCreatePage from '@src/pages/time/TimeCreatePage';
import TimeVotePage from '@src/pages/time/TimeVotePage';
import TimeResultPage from '@src/pages/time/TimeResultPage';
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
        {
          path: PATH.HELP_ID_INQUIRY,
          element: <HelpIdInquiryPage />,
        },
        {
          path: PATH.HELP_PASSWORD_INQUIRY,
          element: <HelpPwInquiryPage />,
        },
      ]),
      ...createAuthRouter('PRIVATE', [
        {
          path: PATH.MY_PAGE,
          element: <MyPage />,
        },
        {
          path: PATH.ONBOARDING,
          element: <OnBoardingPage />,
        },
        {
          path: PATH.LOCATION_ENTER(),
          element: <LocationEnterPage />,
        },
        {
          path: PATH.LOCATION_RESULT(),
          element: <LocationResultPage />,
        },
        {
          path: PATH.LOCATION_RECOMMENDATIONS(),
          element: <LocationRecommendationsPage />,
        },
        {
          path: PATH.PLACE_CREATE(),
          element: <PlaceCreatePage />,
        },
        {
          path: PATH.PLACE_VOTE(),
          element: <PlaceVotePage />,
        },
        {
          path: PATH.PLACE_RESULT(),
          element: <PlaceResultPage />,
        },
        {
          path: PATH.TIME_CREATE(),
          element: <TimeCreatePage />,
        },
        {
          path: PATH.TIME_VOTE(),
          element: <TimeVotePage />,
        },
        {
          path: PATH.TIME_RESULT(),
          element: <TimeResultPage />,
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
