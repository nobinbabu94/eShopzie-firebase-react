import { Avatar, Drawer, List, Toolbar, } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Sidebar = () => {
    return <div>

        <Drawer
            variant="permanent"
            sx={{
                width: '100%', flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: '300px',
                    boxSizing: 'border-box', borderRight: '0px', backgroundColor: 'red'
                }
            }}>
            <List disablePadding>
                <Toolbar>
                    <Stack
                        sx>
                        <Avatar sx={{ bgcolor: 'red' }}>N</Avatar>
                    </Stack>
                </Toolbar>
            </List>

        </Drawer>
    </div>;
};

export default Sidebar;
