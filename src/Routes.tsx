import React, { useContext } from "react";

import { isEmpty } from "lodash";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import {
  Home as HomeView,
  Signin as SigninView,
  Signup as SignupView,
  NotFound as NotFoundView,
} from "./views";

import views from "./views/routes";

const Routes = (): JSX.Element => {
  const userDetails = useContext(UserContext);
  return (
    <ReactRoutes>
      {isEmpty(userDetails) || !userDetails.token ? (
        <>
          <Route path={"/signin"} element={<SigninView />} />
          <Route path={"/signup"} element={<SignupView />} />
          <Route path={"/not-found"} element={<NotFoundView />} />
          <Route path="/" element={<Navigate replace to="/signin" />} />
        </>
      ) : (
        <>
          {views.map((item, i) => (
            <Route key={i} path={item.path} element={item.renderer()} />
          ))}
        </>
      )}
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
