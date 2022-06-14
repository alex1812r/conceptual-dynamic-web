import React from 'react';
import { useParams } from "react-router-dom";
import { Avatar, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import moment from 'moment';
import { PageLoader } from "../../../shared/components/PageLoader";
import { useProductDetails } from "../products.hooks";
import { capitalizeFirstLetter, numberWithCommas } from '../../../shared/utils';

export const ProductDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading } = useProductDetails({ id: Number(id) });

  if(loading) return <PageLoader message="Loading Product..." />;
  else if(!data) return <>Product Not Found</>;

  return (
    <Card>
        <CardContent>
          <Typography variant="h5">
            Product Details
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Stack alignItems="center">
                <Avatar 
                  src={data.imgUrl}
                  variant="square" 
                  style={{ width: 180, height: 180, borderRadius: 20 }} 
                />
                {/* <br />
                <Button onClick={() => {
                  pickImage((files) => {
                    console.log(files);
                  })
                }}>
                  Upload Image
                </Button> */}
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Name
                  </Typography>
                  <Typography>
                    {data.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Status
                  </Typography>
                  {capitalizeFirstLetter(data.status)}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Last Updated
                  </Typography>
                  {moment(data.updatedAt).format('YYYY/MM/DD')}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Count
                  </Typography>
                  <Typography>
                    {data.count}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Unit Price
                  </Typography>
                  <Typography>
                    {numberWithCommas(data.unitPrice)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Description
                  </Typography>
                  <Typography fontStyle="italic">
                    {data.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
}