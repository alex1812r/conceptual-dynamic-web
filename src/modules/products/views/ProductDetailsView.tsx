import React from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import { PageLoader } from "../../../shared/components/PageLoader";
import { useProductDetails } from "../products.hooks";

export const ProductDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading } = useProductDetails({ id: Number(id) });

  if(loading) return <PageLoader message="Loading Product..." />;

  return (
    <Card>
      <CardContent>
        {JSON.stringify(data, null, 2)}
      </CardContent>
    </Card>
  );
}