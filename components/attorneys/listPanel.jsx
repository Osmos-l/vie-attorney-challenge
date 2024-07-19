import { Box, Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import SkeletonAttorneysListPanel from "./skeletonListPanel";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const AttorneyCard = (props) => {
    const { attorney } = props;

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {attorney.name}
                    </Typography>
                    <Typography 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attorney.contactAddress)}`}
                        target="_blank"
                        component="a"
                        style={{ color: 'inherit', textDecoration: 'none', mb: 1.5  }}
                        color="text.secondary"
                    >
                        {attorney.contactAddress}
                    </Typography>
                    <List>
                        <ListItem
                            href={`mailto:${attorney.contactEmail}`}
                            component="a"
                            sx={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            <ListItemIcon>
                                <AlternateEmailIcon />
                            </ListItemIcon>
                            <ListItemText
                                secondary={attorney.contactEmail}
                                primary={'Email'}
                            />
                        </ListItem>
                        <ListItem
                            href={`tel:${attorney.contactPhone}`}
                            component="a"
                            sx={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            <ListItemIcon>
                                <LocalPhoneIcon />
                            </ListItemIcon>
                            <ListItemText
                                secondary={attorney.contactPhone}
                                primary={'Phone'}
                            />
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button href={`/attorneys-panel/show/${attorney.objectId}`} size="small" startIcon={<ZoomInMapIcon />}>Show prices</Button>
                    <Box>
                        <Button href={`/attorneys-panel/edit/${attorney.objectId}`} size="small" variant="contained" startIcon={<EditIcon />} sx={{marginRight: 1}}>
                            Edit
                        </Button>
                        <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
}

const AttorneysListPanel = ({ attorneyStore, query }) => {
    useEffect(() => {
        attorneyStore.fetchAttorneys(query);
    }, [attorneyStore, query]);

    return (
        attorneyStore.isLoading ? (
            <SkeletonAttorneysListPanel />
        ) : (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {attorneyStore.attorneys.map((attorney) => (
                        <AttorneyCard attorney={attorney} key={attorney.objectId} />
                    ))}
                </Grid>
            </Box>
        )
    );
};

export default inject(({ store }) => ({ attorneyStore: store.attorney }))(observer(AttorneysListPanel));