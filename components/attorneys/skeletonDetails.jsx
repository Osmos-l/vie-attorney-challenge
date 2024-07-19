import React from 'react';
import { Box, Divider, Skeleton } from '@mui/material';
import SkeletonAttorneyPricesMapListPanel from '@/components/attorneyPriceMap/skeletonListPanel';

const SkeletonAttorneyDetails = () => {

    return (
        <Box sx={{flexGrow: 1}}>
            <Skeleton />
            <Divider />
            <Skeleton />
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
                    <Skeleton variant="rounded" width={210} height={60} />
                </Box>
                <Box>
                    <Skeleton 
                        variant="circular"  
                        sx={{   
                                width: {xs: 200, sm: 500},
                                height: {xs: 200, sm: 500},
                                m: 'auto'
                            }} 
                    />
                </Box>
            </Box>
            <Divider />
            <Box sx={{paddingTop: 2}}>      
                <SkeletonAttorneyPricesMapListPanel />
            </Box>
        </Box>
  )

}

export default SkeletonAttorneyDetails;