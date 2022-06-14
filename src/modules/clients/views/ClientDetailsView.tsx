import React from 'react';
import { 
  Avatar,
  // Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { PageLoader } from '../../../shared/components/PageLoader';
import { useClientDetails } from '../clients.hooks';
import { capitalizeFirstLetter } from '../../../shared/utils';
import { ClientOrdersTable } from '../components/ClientOrdersTable';
// import { useFilestack } from '../../../shared/hooks';

export const ClientDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useClientDetails({ id: Number(id) });
  // const { pick: pickImage } = useFilestack({ accept: 'image/*' });

  if(loading) return <PageLoader message="Loading Client..." />;
  else if(!data) return <>Client Not Found</>

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">
            Client Details
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={12} md={4}>
              <Stack alignItems="center">
                <Avatar style={{ width: 180, height: 180 }} />
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
                    CI
                  </Typography>
                  <Typography>
                    {data.dni}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Name
                  </Typography>
                  <Typography>
                    {data.name}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Last Name
                  </Typography>
                  <Typography>
                    { data.lastname}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Email
                  </Typography>
                  <Typography>
                    {data.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Phone
                  </Typography>
                  <Typography>
                    {data.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    Status
                  </Typography>
                  {capitalizeFirstLetter(data.status)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent>
          <Typography variant="h5">
            Orders List
          </Typography>
        </CardContent>
        <Divider />
        <ClientOrdersTable
          data={data.orders || []}
        />
      </Card>
    </>
  );
};