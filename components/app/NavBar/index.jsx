'use client'

import { AppBar, Box, Button, Container, Divider, List, ListItem, ListItemButton, ListItemText, rgbToHex, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

const pages = [
    { name: "Home",         path: "/"},
    { name: "Attorneys",    path: "/attorneys-panel"},
];

export const NavBar = () => {
    const pathname = usePathname();

    return (
        <AppBar position="static">
            <Toolbar 
                sx={{ display: { xs: "block", md: "flex" } }}
            >
                <Typography
                   variant="h6"
                   component="div"
                   sx={{ display: "block", textAlign: "center" }}
                >
                    CRUD
                </Typography>
                <Divider />
                <Box sx={{ display: "block" }}>
                    {pages.map(({ name, path }) => (
                        <Button 
                            key={name}
                            href={path} 
                            sx={{ color: pathname === path ? "rgba(17, 25, 39, 0.38)" : "white" }}
                        >
                            {name}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    )
}