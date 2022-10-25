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

import protectedRoutes from "./views/routes";

const Routes = (): JSX.Element => {
  const userDetails = useContext(UserContext);
  const isLoggedIn = !isEmpty(userDetails) && userDetails.user_id !== "";
  return (
    <ReactRoutes>
      {!isLoggedIn ? (
        <Route>
          <Route path={"/signin"} element={<SigninView />} />
          <Route path={"/signup"} element={<SignupView />} />
          <Route path="/" element={<Navigate replace to="/signin" />} />
        </Route>
      ) : (
        <Route>
          {protectedRoutes.map((route, i) => {
            return (
              <Route key={i} path={route.path} element={route.renderer()} />
            );
          })}
        </Route>
      )}
      <Route path={"/not-found"} element={<NotFoundView />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
