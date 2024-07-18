import { Box, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "../app/SearchBar";
import AttorneysListPanel from "./listPanel";
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

const AttorneysSearchPanel = () => {
    const searchParams  = useSearchParams();
    const query = Object.fromEntries([...searchParams]);

    useEffect(() => {
        // Vous pouvez utiliser attorneyStore et faire des effets secondaires ici si nécessaire
    }, [query]);

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box sx={{ width: '300px' }}>
                    <SearchBar queryName={'name'} />
                    <Button sx={{ width: '100%' }}>New Attorney</Button>
                </Box>
            </Box>
            <Box>
                <AttorneysListPanel />
            </Box>
        </Box>
    );
};

export default AttorneysSearchPanel;
