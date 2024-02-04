import * as React from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import ClientStyleContext from './ClientStyleContext';
import { withEmotionCache } from '@emotion/react';
import { Container, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import { CoError404, CoError500, CoErrorInspection } from '@/components';

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = React.useContext(ClientStyleContext);
  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

// https://remix.run/docs/en/main/route/component
// https://remix.run/docs/en/main/file-conventions/routes
export default function App() {
  return (
    <Document title='Hello, Remix'>
      <Container maxWidth="lg">
        {/* <Box sx={{ my: 8 }}> */}
        <Outlet />
        {/* </Box> */}
      </Container>
    </Document>
  );
}

// https://remix.run/docs/en/main/route/error-boundary
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <>
            <Document title={`Remix-Blog ${error.data}`}>
              <CoError404 errorData={error} />
            </Document>
          </>
        )
      case 500:
        return (
          <>
            <Document title={`Remix-Blog ${error.data}`}>
              <CoError500 errorData={error} />
            </Document>
          </>
        )
      case 999:
        return (
          <>
            <Document title={`Remix-Blog ${error.data}`}>
              <CoErrorInspection errorData={error} />
            </Document>
          </>
        )
      default:
        throw new Error(error.data || error.statusText);
    }
  }

  if (error instanceof Error) {
    console.error(error);
    return (
      <Document title="Error!">
        {/* <Layout> */}
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
        {/* </Layout> */}
      </Document>
    );
  }

  return <h1>Unknown Error</h1>;
}