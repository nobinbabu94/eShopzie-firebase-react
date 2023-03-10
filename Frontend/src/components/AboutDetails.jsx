import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AboutDetails = () => {
  const parentStyle = {
    width: "100%",
    height: "auto",
    p: 2,
    display: "flex",flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",textAlign:'center'
  };

  return (
    <>
      <Grid
        sx={parentStyle}
      >

        <Typography variant="h5" sx={{mb:4}}>
          Incredible Prices on All Your Favorite Items
        </Typography>

        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis
          turpis sit amet sapien viverra cursus. Maecenas suscipit blandit
          volutpat. Vivamus eget magna tortor. Quisque a tempor elit. Nulla
          egestas efficitur porta. Donec mattis mi ipsum, sed scelerisque quam
          imperdiet a. Vivamus convallis, odio tempor tempor dignissim, velit
          odio condimentum dolor, non posuere augue orci ut tortor. 
          <br/>
          Duis nec
          orci aliquet, vestibulum augue quis, vulputate nulla. Sed vel quam
          viverra, placerat orci et, scelerisque eros. Proin in blandit tortor.
          Nulla aliquam odio vitae efficitur hendrerit. In hac habitasse platea
          dictumst. 
        </Typography>
        <Typography>Praesent a quam eget orci congue maximus ut at quam.
          Maecenas posuere tristique imperdiet. Ut ac enim ac nisi lobortis
          eleifend nec a ipsum. Integer malesuada, diam vitae rhoncus sodales,
          lorem magna pellentesque quam, quis fringilla purus mi sed ante.
          Pellentesque vulputate nisl diam, in gravida nulla ultrices in. Nam
          hendrerit risus sed varius feugiat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed efficitur nisl quis cursus efficitur.
          <br/>
          Phasellus finibus sapien nec justo luctus commodo. Nam et ipsum vitae
          libero dignissim sollicitudin. Duis non efficitur leo. Quisque rhoncus
          condimentum hendrerit. Aenean leo mi, pretium id faucibus vel,
          malesuada accumsan risus. Pellentesque id libero consectetur, porta
          odio nec, posuere velit. Donec enim massa, finibus id orci id,
          molestie dignissim purus. Nunc placerat accumsan finibus. Suspendisse
          placerat scelerisque mi, ut gravida libero facilisis sit amet. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nullam sollicitudin nisl feugiat, fringilla ipsum ut,
          ultrices libero.</Typography>
          <Link to='/admin-login' style={{textDecoration:'none'}}><Typography>ad</Typography></Link>
      </Grid>
    </>
  );
};

export default AboutDetails;
