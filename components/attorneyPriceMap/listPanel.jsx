import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import SkeletonAttorneyPricesMapListPanel from "@/components/attorneyPriceMap/skeletonListPanel";

const AttorneyCard = (props) => {
    const { attorney } = props;

    return (
        <Grid item xs={12} sm={6} md={3}>
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
                    <Button href={`/attorneys-panel/show/${attorney.objectId}`} size="small" startIcon={<ZoomInMapIcon />}>Show prices</Button>
                    <Box>
                        <Button href={`/attorneys-panel/edit/${attorney.objectId}`} variant="contained" startIcon={<EditIcon />}>
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

const AttorneyPricesMapListPanel = ({ attorneyPriceMapStore, query }) => {
    useEffect(() => {
        //attorneyStore.fetchAttorneys(query);
    }, [attorneyPriceMapStore, query]);

    return (
        attorneyPriceMapStore.isLoading ? (
            <SkeletonAttorneyPricesMapListPanel />
        ) : (
            <SkeletonAttorneyPricesMapListPanel />
        )
    );
};

export default inject(({ store }) => ({ attorneyPriceMapStore: store.attorneyPriceMap }))(observer(AttorneyPricesMapListPanel));