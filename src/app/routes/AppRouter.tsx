import { Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '@src/app/routes/guards';
import { APIErrorBoundary, SentryErrorBoundary } from '@src/app/providers';
import { sentryCreateBrowserRouter } from '@shared/utils';
import { GlobalLoading } from '@src/components/loading/GlobalLoading';
import { PATH, ROUTE_TYPE } from '@shared/constants/path';
import { Suspense } from 'react';
import HelpPwInquiryPage from '@pages/auth/HelpPwInquiryPage';
import SignInPage from '@pages/auth/SignInPage';
import SignUpPage from '@pages/auth/SignUpPage';
import SomethingWrongErrorPage from '@pages/error/SomethingWrongErrorPage';
import LandingPage from '@pages/landing/LandingPage';
import OnBoardingPage from '@pages/onboarding/OnBoardingPage';
import LocationEnterPage from '@pages/location/LocationEnterPage';
import LocationResultPage from '@pages/location/LocationResultPage';
import LocationRecommendationsPage from '@pages/location/LocationRecommendationsPage';
import PlaceCreatePage from '@pages/place/PlaceCreatePage';
import PlaceVotePage from '@pages/place/PlaceVotePage';
import PlaceResultPage from '@pages/place/PlaceResultPage';
import TimeCreatePage from '@pages/time/TimeCreatePage';
import TimeVotePage from '@pages/time/TimeVotePage';
import TimeResultPage from '@pages/time/TimeResultPage';
import { Layout, RoomLayout } from '@src/app/layout';
import UserPage from '@pages/users/UserPage';
import UserProfile from '@src/components/users/UserProfile';
import UserGroupList from '@src/components/users/UserGroupList';
import UserLogout from '@src/components/users/UserLogout';
import UserQuit from '@src/components/users/UserQuit';
import UserChangePassword from '@src/components/users/UserChangePassword';
import KakaoLogin from '@src/components/auth/oauth/KakaoLogin';
import NaverLogin from '@src/components/auth/oauth/NaverLogin';
import GoogleLogin from '@src/components/auth/oauth/GoogleLogin';
import Oauth from '@src/components/auth/oauth/Oauth';
import { AboutPage } from '@pages/about';

const createAuthRouter = (routeType: ROUTE_TYPE, children: RouteObject[]) => {
  const authRouter = children.map((child: RouteObject) => ({
    element: routeType === 'PRIVATE' ? <PrivateRoute /> : <PublicRoute />,
    children: [child],
  }));
  return authRouter;
};

// Sentry와 통합된 브라우저 라우터 사용
const router = sentryCreateBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <SentryErrorBoundary>
        <APIErrorBoundary>
          <Suspense fallback={<GlobalLoading />}>
            <Layout>
              <Outlet />
            </Layout>
          </Suspense>
        </APIErrorBoundary>
      </SentryErrorBoundary>
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
