import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminRouter from './router/AdminRouter';
import ClientRouter from "~/router/ClientRouter";
import '~/css/global.scss';

export default function App() {
  const location = useLocation();
  const checkLayoutClient =location.pathname.split('/')[1] !== 'admin';
  return <>{checkLayoutClient ? <ClientRouter /> : <AdminRouter />}</>;
}