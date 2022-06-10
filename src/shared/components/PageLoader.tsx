import React from 'react';
import { MainLoader } from './MainLoader';
import { PageCentered } from './PageCentered';

interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message }) => (
  <PageCentered>
    <MainLoader message={message} />
  </PageCentered>
);
