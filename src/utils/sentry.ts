import * as Sentry from '@sentry/react';

export const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,

    enabled: import.meta.env.PROD,

    sendDefaultPii: true,

    integrations: [
      Sentry.browserTracingIntegration(),

      Sentry.replayIntegration(),
    ],

    tracesSampleRate: 0.5,

    tracePropagationTargets: [
      /^\//,
      /^https:\/\/www\.api\.syncspot\.kr/,
      /^https:\/\/www\.dev\.syncspot\.kr/,
    ],

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    environment: import.meta.env.MODE,
  });
};

export const sentryReactErrorHandler = Sentry.reactErrorHandler;
