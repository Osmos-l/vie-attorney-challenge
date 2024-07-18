import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { inject, observer } from 'mobx-react';
import { useEffect } from "react";

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
                <CardActions>
                    <Button size="small">Show prices</Button>
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