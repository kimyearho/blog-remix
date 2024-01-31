import { Outlet } from '@remix-run/react';

export default function MovieLayout() {
  return (
    <div>
      <h1>Movie 레이아웃 영역</h1>
      <Outlet />
      <hr />
    </div>
  );
}