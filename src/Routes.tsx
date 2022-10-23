import React from "react";

import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import views from "./views/routes";

const Routes = (): JSX.Element => {
  return (
    <ReactRoutes>
      {views.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
