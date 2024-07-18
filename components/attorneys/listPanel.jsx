import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { inject, observer } from 'mobx-react';
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import Divider from '@mui/material/Divider';

const AttorneyCard = (props) => {
    const { attorney } = props;
    console.log(attorney);
    return (
        <Grid item xs={6} md={3}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {attorney.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {attorney.companyName}
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

const AttorneysListPanel = ({ attorneyStore }) => {

    useEffect(() => {
        attorneyStore.fetchAttorneys();
    }, [attorneyStore]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {
                    attorneyStore.attorneys.map((attorney) => (
                        <AttorneyCard attorney={attorney} key={attorney.objectId} />
                    ))
                }
            </Grid>
        </Box>
    )
}

export default inject(({ store }) => ({ attorneyStore: store.attorney }))(observer(AttorneysListPanel));