import React from 'react';
import { Routes as RoutesComponent, Route } from 'react-router-dom';
import { ClientsListView } from './modules/clients/views/ClientsListView';

export const Routes: React.FC = () => {
  return (
    <RoutesComponent>
      <Route path="/clients" element={<ClientsListView />} />
    </RoutesComponent>
  );
};