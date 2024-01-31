/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  serverBuildPath: "build/index.js",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/", "components/common/layouts/DefaultLayout.tsx", () => {
        route("", "router/home/Home.tsx", { index: true });
        route("about", "router/about/index.tsx");
        //* '/about/post/?'는 '/about'의 레이아웃을 적용받지않음.
        route("about/post/:id", "router/about/About.tsx");
        //* '/movie'는 부모 레이아웃 경로 (route.tsx에서 layout을 import하고, /list로 리다이렉트 처리됨)
        //* '/moive/list'는 부모 레이아웃을 적용받음.
        //* '/moive/detail/?'는 부모 레이아웃을 적용받음.
        route("movie", "router/movie/index.tsx", () => {
          route("list", "router/movie/list/MovieList.tsx", { index: true });
          route("detail/:id", "router/movie/detail/MovieDetail.tsx");
        });
      });
    })
  },
};
