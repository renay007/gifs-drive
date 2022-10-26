import React from "react";

import { Home as HomeView } from "./";

const routes = [
  {
    path: "/",
    renderer: (params = {}): JSX.Element => <HomeView {...params} />,
  },
];

export default routes;
