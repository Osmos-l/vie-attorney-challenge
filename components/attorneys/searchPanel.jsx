import { Box, Button, Divider, FormControl, InputLabel, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "../app/SearchBar";
import AttorneysListPanel from "./listPanel";
import { inject, observer } from 'mobx-react';
import { Suspense, useEffect } from 'react';
import SkeletonAttorneysListPanel from "./skeletonListPanel";

const Filters = () => {

    return (
        <Box sx={{ display: { xs: "block", sm: "flex" }, justifyContent: "space-evenly" }}>
                <FormControl sx={{ m: 1, minWidth: { xs: "100%", sm: "200px"} }} size="small" >
                    <InputLabel id="state-filter-label">State</InputLabel>
                        <Select
                            labelId="state-filter-label"
                            id="state-filter"
                            label="State"
                            disabled
                        >
                        </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: { xs: "100%", sm: "200px"} }} size="small" >
                    <InputLabel id="court-filter-label">Court</InputLabel>
                        <Select
                            labelId="court-filter-label"
                            id="court-filter"
                            label="Court"
                            disabled
                        >
                        </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: { xs: "100%", sm: "200px"} }} size="small" >
                    <InputLabel id="county-filter-label">County</InputLabel>
                        <Select
                            labelId="county-filter-label"
                            id="county-filter"
                            label="County"
                            disabled
                        >
                        </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: { xs: "100%", sm: "200px"} }} size="small" >
                    <InputLabel id="price-filter-label">Price</InputLabel>
                        <Select
                            labelId="price-filter-label"
                            id="price-filter"
                            label="Price"
                            disabled
                        >
                        </Select>
                </FormControl>
            </Box>
    )
}

const AttorneysSearchPanel = () => {
    const searchParams  = useSearchParams();
    const query = Object.fromEntries([...searchParams]);

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box sx={{ width: '300px' }}>
                    <SearchBar queryName={'name'} />
                    <Button sx={{ width: '100%' }} component="a" href="/attorneys-panel/new">+ New Attorney</Button>
                </Box>
            </Box>
            <Divider />
            <Filters />
            <Divider />
            <Box sx={{ paddingTop: 2 }}>
                <Suspense fallback={<SkeletonAttorneysListPanel />} >
                    <AttorneysListPanel query={query} />
                </Suspense>
            </Box>
        </Box>
    );
};

export default AttorneysSearchPanel;
