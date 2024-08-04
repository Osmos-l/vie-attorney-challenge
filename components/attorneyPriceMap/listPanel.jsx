import { Box, Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PanToolIcon from '@mui/icons-material/PanTool';
import FlagIcon from '@mui/icons-material/Flag';
import SkeletonAttorneyPricesMapListPanel from "@/components/attorneyPriceMap/skeletonListPanel";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

import humanFormat from "human-format";

const PriceMapCard = (props) => {
    const { priceMap } = props;

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card>
                <CardContent>
                    <List>
                        {priceMap.violation && (
                            <ListItem>
                                <ListItemIcon>
                                    <PanToolIcon />
                                </ListItemIcon>
                                <ListItemText
                                    secondary={priceMap.violation.name}
                                    primary={'Violation'}
                                />
                            </ListItem>
                        )}
                        {priceMap.court && (
                            <ListItem>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText
                                    secondary={priceMap.court.disp_name()}
                                    primary={'Court'}
                                />
                            </ListItem>
                        )}
                        {priceMap.county && (
                            <ListItem>
                                <ListItemIcon>
                                    <FlagIcon />
                                </ListItemIcon>
                                <ListItemText
                                    secondary={priceMap.county.disp_name()}
                                    primary={'County'}
                                />
                            </ListItem>
                        )}
                        <ListItem>
                            <ListItemIcon>
                                <DirectionsCarIcon />
                            </ListItemIcon>
                            <ListItemText
                                secondary={priceMap.points}
                                primary={'Points'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText
                                secondary={humanFormat(priceMap.price)}
                                primary={'Price'}
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Grid>
    )
}

const AttorneyPricesMapListPanel = ({ attorneyId, attorneyPriceMapStore }) => {
    useEffect(() => {
        if (attorneyId) {
            const params = {
                attorneyId: attorneyId
            };

            attorneyPriceMapStore.fetchPrices(params);
        }
    }, [attorneyPriceMapStore, attorneyId]);

    return (
        attorneyPriceMapStore.isLoading ? (
            <SkeletonAttorneyPricesMapListPanel />
        ) : (
            <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        attorneyPriceMapStore.priceMap.length <= 0 ? 
                        (
                            <Grid item xs={12}>
                                    <Typography 
                                        color="text.secondary"
                                        sx={{textAlign: 'center', mb: 1.5 }}
                                    >
                                        <SentimentDissatisfiedIcon /><br />
                                        No data found ...
                                    </Typography>
                            </Grid>
                        ) : (
                            attorneyPriceMapStore.priceMap.map((priceMap) => (
                                <PriceMapCard priceMap={priceMap} key={priceMap.objectId} />
                            ))
                        )
                    }
                    
                </Grid>
            </Box>
            </>
            
        )
    );
};

export default inject(({ store }) => ({ attorneyPriceMapStore: store.attorneyPriceMap }))(observer(AttorneyPricesMapListPanel));