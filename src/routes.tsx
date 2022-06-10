import React from 'react';
import { Routes as RoutesComponent, Route } from 'react-router-dom';
import { ClientRoutes } from './modules/clients/ClientsRoutes';
import { ProductsRoutes } from './modules/products/ProductsRoutes';

export const Routes: React.FC = () => {
  return (
    <RoutesComponent>
      <Route path="/clients/*" element={<ClientRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
    </RoutesComponent>
  );
};