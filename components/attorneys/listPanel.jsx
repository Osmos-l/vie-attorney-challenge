import { Box, Button, Card, CardActions, CardContent, Grid, Skeleton, Typography } from "@mui/material"
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import Divider from '@mui/material/Divider';

const AttorneyCard = (props) => {
    const { attorney } = props;

    return (
        <Grid item xs={6} md={3}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {attorney.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {attorney.contactAddress}
                    </Typography>
                    <Typography variant="body2">
                        {attorney.contactEmail}
                        <br />
                        {attorney.contactPhone}
                        <br />
                        Lorem ispum.
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button size="small" startIcon={<ZoomInMapIcon />}>Show prices</Button>
                    <Box>
                        <Button variant="contained" startIcon={<EditIcon />}>
                            Edit
                        </Button>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
}

const AttorneyCardSkeleton = () => {

    return (
        <Grid item xs={6} md={3}>
            <Card>
                <CardContent>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </CardContent>
                <CardActions>
                    <Skeleton />
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
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {
                    attorneyStore.isLoading ? (
                        [...Array(10)].map((i) => (
                            <AttorneyCardSkeleton key={i} />
                        ))
                       
                    ) : (
                        attorneyStore.attorneys.map((attorney) => (
                            <AttorneyCard attorney={attorney} key={attorney.objectId} />
                        ))
                    )
                }
                
            </Grid>
        </Box>
    )
}

export default inject(({ store }) => ({ attorneyStore: store.attorney }))(observer(AttorneysListPanel));