import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../Styles/theme";

const date = new Date()
const year = date.getFullYear()

const Footer = () => {

    const boxStyle = {
        backgroundColor: theme.palette.primary.main,mt:2,
        width: 'auto', height: '100px', display: 'flex',zIndex:999,
        justifyContent: 'center', alignItems: 'center', color: 'white',
    }


    return (
        <>
            <Box sx={boxStyle}>
                <Typography sx={{textAlign:'center'}}> &copy; {year} all rights reserved eShopzie </Typography>


            </Box>

        </>
    )
};

export default Footer;
