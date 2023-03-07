import { Grid, Typography, } from "@mui/material";
import React, { lazy, Suspense } from "react";
import Slider from "../../components/Slider";
import { Footer, Header } from "../../components";
import { colors } from "../../Styles/theme";
import LaptopHome from "../../components/LaptopHome";
import Loader from "../../components/Loader";

const RecentlyAddedProducts = lazy(() => import('../../components/RecentlyAddedProducts'))

const Home = () => { 

  return (
    <>
      <Header />
      <Grid className="animate__animated animate__fadeIn"
        flexDirection={"column"} sx={{ width: '100%', mt: 12, height: 'auto', mb: 2, }}>
          
        <Slider />
        <Grid >
          <LaptopHome />
        </Grid>
        <Grid sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <Typography variant="h5" color={colors.amber} sx={{ mt: 3 }}>Recently Added</Typography>
        </Grid>
        <Grid sx={{
          gap: 1,
        }}>
          <Suspense fallback={<Loader/>}>
            <RecentlyAddedProducts />
          </Suspense>
        </Grid>
     
      </Grid>
      < Footer />
    </>
  );
};

export default Home;
