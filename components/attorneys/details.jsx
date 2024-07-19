import { inject, observer } from 'mobx-react';
import React, { Suspense, useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Divider, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import AttorneyFakeImage from '@/public/pierre_gasly_attorney.webp'
import AttorneyPricesMapListPanel from '@/components/attorneyPriceMap/listPanel';

import Alert from '@mui/material/Alert';
import SkeletonAttorneyPricesMapListPanel from '../attorneyPriceMap/skeletonListPanel';

const AttorneyDetails = ({ attorney, attorneyStore }) => {
    const router = useRouter();

    const handleCancel = () => {
        router.back();
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Typography 
                variant="h3" component="div"
                sx={{textAlign: 'center'} }
            >
                {attorney.name}
            </Typography>
            <Typography 
                color="text.secondary"
                sx={{textAlign: 'center', mb: 1.5 }}
            >
                Expert Legal Defense for Traffic Violations: Your solution with an experienced attorney.
            </Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center", py: 1 }} >
                <Button 
                    variant="contained"
                    color="primary"
                    disabled={attorney.chatEnabled}
                    sx={{ margin: 1 }}
                >
                    Start chat
                </Button>
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={handleCancel}
                    sx={{ margin: 1 }}
                >
                    Go Back
                </Button>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", 
                        justifyContent: "space-evenly", 
                        verticalAlign: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        paddingY: 2 
                    }}>
                <Box sx={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        verticalAlign: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Informations
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                secondary={attorney.contactAddress}
                                primary={'Address'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                secondary={attorney.contactPhone}
                                primary={'Phone'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                secondary={attorney.contactEmail}
                                primary={'Email'}
                            />
                        </ListItem>
                    </List>
                </Box>
                <Box>
                <Avatar 
                    alt="The image" 
                    src={AttorneyFakeImage}
                    sx={{   width: {xs: 200, sm: 500},
                            height: {xs: 200, sm: 500},
                            m: 'auto'
                        }}
                    />
                </Box>
            </Box>
            <Divider />
            <Box sx={{paddingTop: 2}}>
                <Suspense fallback={<SkeletonAttorneyPricesMapListPanel />}>          
                    <AttorneyPricesMapListPanel />
                </Suspense>
            </Box>
        </Box>
  )

}

export default inject(({ store }) => ({ attorneyStore: store.attorney }))(observer(AttorneyDetails));