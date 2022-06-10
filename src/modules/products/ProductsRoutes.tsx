import React from 'react';
import { Routes as RoutesComponent, Route } from 'react-router-dom';
import { ProductDetailsView } from './views/ProductDetailsView';
import { ProductsListView } from './views/ProductsListView';

export const ProductsRoutes: React.FC = () =>{
  return (
    <RoutesComponent>
      <Route path="" element={<ProductsListView />} />
      <Route path="/:id" element={<ProductDetailsView />} />
    </RoutesComponent>
  )
}