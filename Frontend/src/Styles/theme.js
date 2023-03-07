import { blueGrey, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";


export const colors = {
primary:'#fafafa',
orange:'#ff5722',
brown:'#795548',
pink:'#e91e63',
darkBlue:'#0a1930',
lightGrey:'#90a4ae',
black:'#0a1930',
darkred:'#d50000',
lightred:'#f44336',
green:'#1b5e20',
lightpink:'#fce4ec',
grey100:'#f5f5f5',
blue100:'#bbdefb',
blueGrey600:'#546e7a',
pink300:'#f06292',
amber:'#ffc107',

}

const theme = createTheme({
    palette:{
        primary:{
            main:colors.blueGrey600
        }
    }
})

export default theme;