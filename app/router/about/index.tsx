import { Link, Outlet } from '@remix-run/react';

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <Outlet />
      <hr />
      <ul>
        <li>
          <Link to="/about/post/1">게시글 1</Link>
        </li>
        <li>
          <Link to="/about/post/2">게시글 2</Link>
        </li>
        <li>
          <Link to="/about/post/3">게시글 3</Link>
        </li>
      </ul>
    </div>
  );
}