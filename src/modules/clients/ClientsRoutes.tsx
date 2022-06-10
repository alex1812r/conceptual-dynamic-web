import React from 'react';
import { Routes as RoutesComponent, Route } from 'react-router-dom';
import { ClientDetailsView } from './views/ClientDetailsView';
import { ClientsListView } from './views/ClientsListView';

export const ClientRoutes: React.FC = () => {
  return (
    <RoutesComponent>
      <Route path="" element={<ClientsListView />} />
      <Route path="/:id" element={<ClientDetailsView />} />
    </RoutesComponent>
  );
};