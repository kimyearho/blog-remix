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
  json,
  useLoaderData,
} from '@remix-run/react';
import ClientStyleContext from './ClientStyleContext';
import { withEmotionCache } from '@emotion/react';
import { Container, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import { CoError404, CoError500, CoErrorInspection } from '@/components';
import { SWRConfig } from 'swr';
import { http } from "~/modules/api/http";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

//* 전역 Axios fetcher
// https://swr.vercel.app/ko/docs/data-fetching
const fetcher = (url: any) => http.get(url).then(res => res.data)

//* 전역 클라이언트에서 환경변수를 사용하기위해서 설정.
// https://sergiodxa.com/tutorials/use-process-env-client-side-with-remix
export const loader = async () => {
  return json({ ENV: { BASE_URL: process.env.BASE_URL, API_KEY: process.env.API_KEY } })
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const data = useLoaderData<typeof loader>();
  const clientStyleData = React.useContext(ClientStyleContext);
  useEnhancedEffect(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    clientStyleData.reset();
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
        <ScrollRestoration />
        {/* https://sergiodxa.com/tutorials/use-process-env-client-side-with-remix */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = ${JSON.stringify({
              env: data.ENV,
            })}`,
          }}
        />
        <Scripts />
        <LiveReload />
        {children}
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
        <SWRConfig value={{
          fetcher: fetcher,
          revalidateOnFocus: false
        }}>
          <Outlet />
        </SWRConfig>
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