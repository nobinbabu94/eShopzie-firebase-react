import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../Styles/theme";

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <>
      <Grid sx={{ width: "100%", maxWidth: "25rem", mr: "1rem", mab: "1rem",gap:3 }}>
        <Card
          sx={{
            border: " 1px solid #ccc",
            bb: "5px solid var(--light-blue)",
            padding: " 5px",
            bgcolor:colors.lightpink,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{count}</Typography>
            {icon}
          </Grid>
          <Grid></Grid>
        </Card>
      </Grid>
    </>
  );
};

export default InfoBox;
