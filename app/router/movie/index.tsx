import { LoaderFunction, redirect } from "@remix-run/node";
import Layout from './MovieLayout'

//* default
export default Layout

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  //* path가 /movie일때 /movie/list로 리다이렉트처리
  if (url.pathname === "/movie") {
    return redirect("/movie/list");
  }
  return null;
};
