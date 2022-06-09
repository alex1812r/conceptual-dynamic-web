import React from "react";
import { Card, Typography } from "@mui/material";
import { useClientsList } from "../clients.hooks";
import { ClientsTable } from "../components/ClientsTable";

export const ClientsListView: React.FC = () => {
  const { data, loading } = useClientsList();

  if(loading) return <>Loading...</>;

  return (
    <div>
      <Typography variant="h3" component="h1">Clients List</Typography>
      <br />
      <Card>
        <ClientsTable data={data} />
      </Card>
      {/* <ul>
        {data.map((item, i) => (
          <li key={`client-${i+1}`}>
            {item.name} {item.lastname}
          </li>
        ))}
      </ul> */}
    </div>
  );
}