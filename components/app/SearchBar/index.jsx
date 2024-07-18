'use client'

import { Box, Input, TextField } from "@mui/material"
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useDebouncedCallback } from 'use-debounce';

const debounceTime   = 300; // in ms

export const SearchBar = (props) => {
    const { queryName } = props;
    const paramName     = queryName || 'query';

    const searchParams  = useSearchParams();
    const pathname      = usePathname();
    const { replace }   = useRouter();

    const handleSearch  = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) {
            params.set(paramName, term);
        } else {
            params.delete(paramName);
        }

        replace(`${pathname}?${params.toString()}`);
    }, debounceTime);

    return (
        <Box >
            <TextField
                variant="outlined"
                placeholder="Search ..."
                sx={{
                    bgcolor: 'background.paper',
                    width: '100%'
                    }}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get(paramName)?.toString()}
            />
        </Box>
    )
}