import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRouts, publicRouts } from '../routes';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { PAGE_NOT_FOUND } from "../utils/consts";

const AppRouter = observer(() => {
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
      <Route path="*" element={<Navigate to={PAGE_NOT_FOUND} replace />} />
    </Routes>
  )
})

export default AppRouter;