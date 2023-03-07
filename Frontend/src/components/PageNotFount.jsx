import { Grid, Typography } from "@mui/material";
import React from "react";

import { colors } from "../Styles/theme";

const PageNotFount = () => (
  <>
    <Grid
      width={'100%'}
      height={'100%'}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" color={colors.brown}>
        404
      </Typography>
      <Typography variant="h5" color={colors.blueGrey600}>
        {" "}
        Page not found
      </Typography>
      <Typography variant="h6" color={colors.blueGrey600}>
        the server cannot find the requested resource
      </Typography>
    </Grid>
  </>
);

export default PageNotFount;
