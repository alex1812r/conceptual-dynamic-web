import React from 'react';
import { Routes as RoutesComponent, Route } from 'react-router-dom';
import { OrderDetailsView } from './views/OrderDetailsView';
import { OrdersListView } from './views/OrdersListView';

export const OrdersRoutes: React.FC = () => {
  return (
    <RoutesComponent>
      <Route path="" element={<OrdersListView />} />
      <Route path="/:id" element={<OrderDetailsView />} />
    </RoutesComponent>
  )
};