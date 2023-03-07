// import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ReactDOM from 'react-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
 
};

export default function Loader() {


    return ReactDOM.createPortal(
        <div>

            <Box
                height='100%'
                width='100%'
                sx={{
                    position: 'absolute', top: '50%', zIndex: 999,
                    left: '50%',
                    transform: 'translate(-50%, -50%)', bgcolor: 'grey', opacity: .5
                }}
            >


                <Box sx={style}>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress  variant="determinate"/>
                    </Box>
                </Box>
            </Box>

        </div>, document.getElementById('loader')
    );
}
