import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRouts, publicRouts } from '../routes';
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);
  // console.log(user)
  return (
    <Routes>
      {user.isAuth && authRouts.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {publicRouts.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;