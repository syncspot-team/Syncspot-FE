import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import PrivateRoute from '@src/components/common/routes/PrivateRoute';
import PublicRoute from '@src/components/common/routes/PublicRoute';
import { APIErrorBoundary } from '@src/components/error/boundary/APIErrorBoundary';
import { UnknowErrorBoundary } from '@src/components/error/boundary/UnknowErrorBoundary';
import { GlobalLoading } from '@src/components/loading/GlobalLoading';
import { PATH, ROUTE_TYPE } from '@src/constants/path';
import { Suspense } from 'react';
import HelpPwInquiryPage from '@src/pages/auth/HelpPwInquiryPage';
import SignInPage from '@src/pages/auth/SignInPage';
import SignUpPage from '@src/pages/auth/SignUpPage';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';
import LandingPage from '@src/pages/landing/LandingPage';
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
import Layout from '@src/components/layout/Layout';
import AboutPage from '@src/pages/about/AboutPage';
import UserPage from '@src/pages/users/UserPage';
import UserProfile from '@src/components/users/UserProfile';
import UserGroupList from '@src/components/users/UserGroupList';
import UserLogout from '@src/components/users/UserLogout';
import UserQuit from '@src/components/users/UserQuit';
import RoomLayout from '@src/components/layout/RoomLayout';
import UserChangePassword from '@src/components/users/UserChangePassword';
import KakaoLogin from '@src/components/auth/oauth/KakaoLogin';
import NaverLogin from '@src/components/auth/oauth/NaverLogin';
import GoogleLogin from '@src/components/auth/oauth/GoogleLogin';
import Oauth from '@src/components/auth/oauth/Oauth';
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
            <Layout>
              <Outlet />
            </Layout>
          </Suspense>
        </APIErrorBoundary>
      </UnknowErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: PATH.ABOUT,
        element: <AboutPage />,
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
          path: PATH.HELP_PASSWORD_INQUIRY,
          element: <HelpPwInquiryPage />,
        },
        {
          path: PATH.OAUTH,
          element: <Oauth />,
          children: [
            {
              path: PATH.OAUTH_KAKAO_CALLBACK,
              element: <KakaoLogin />,
            },
            {
              path: PATH.OAUTH_NAVER_CALLBACK,
              element: <NaverLogin />,
            },
            {
              path: PATH.OAUTH_GOOGLE_CALLBACK,
              element: <GoogleLogin />,
            },
          ],
        },
      ]),
      ...createAuthRouter('PRIVATE', [
        {
          path: PATH.USERS,
          element: <UserPage />,
          children: [
            {
              path: PATH.USERS_PROFILE,
              element: <UserProfile />,
            },
            {
              path: PATH.USERS_GROUP_LISTS,
              element: <UserGroupList />,
            },
            {
              path: PATH.USERS_PASSWORD,
              element: <UserChangePassword />,
            },
            {
              path: PATH.USERS_LOGOUT,
              element: <UserLogout />,
            },
            {
              path: PATH.USERS_QUIT,
              element: <UserQuit />,
            },
          ],
        },
        {
          path: PATH.ONBOARDING,
          element: <OnBoardingPage />,
        },
        {
          element: <RoomLayout />,
          children: [
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
          ],
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
