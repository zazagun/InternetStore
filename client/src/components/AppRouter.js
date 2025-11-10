import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRouts, publicRouts } from '../routes'

const AppRouter = () => {
    const isAuth = false
    return (
        <Routes>
            {isAuth && authRouts.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRouts.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;