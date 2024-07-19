import { Box, Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material"

const AttorneyPriceMapCardSkeleton = () => {
    return (
        <Grid item xs={12} sm={6} md={3}>
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

const SkeletonAttorneyPricesMapListPanel = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {
                   [...Array(10)].map((_, i) => (
                    <AttorneyPriceMapCardSkeleton key={i} />
                    ))
                }
            </Grid>
        </Box>
    )
}

export default SkeletonAttorneyPricesMapListPanel;