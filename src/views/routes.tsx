import React from "react";

import {
  Home as HomeView,
  Signin as SigninView,
  Signup as SignupView,
  NotFound as NotFoundView,
} from "./";

const routes = [
  {
    path: "/",
    renderer: (params = {}): JSX.Element => <HomeView {...params} />,
  },
  {
    path: "/signin",
    renderer: (params = {}): JSX.Element => <SigninView {...params} />,
  },
  {
    path: "/signup",
    renderer: (params = {}): JSX.Element => <SignupView {...params} />,
  },
  {
    path: "/not-found",
    renderer: (params = {}): JSX.Element => <NotFoundView {...params} />,
  },
];

export default routes;
