import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';
import { useRouter } from 'next/router';

import Alert from '@mui/material/Alert';
import SkeletonAttorneyPricesMapListPanel from '../attorneyPriceMap/skeletonListPanel';

const AttorneyForm = ({ initialData, attorneyStore }) => {
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [contactAddress, setContactAddress] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError]     = useState(false);

    useEffect(() => {
        if (initialData) {
            mountFormWithInitialData();
        }
    }, [initialData]);

    const mountFormWithInitialData = () => {
        setId(initialData.objectId);
        setName(initialData.name);
        setContactAddress(initialData.contactAddress);
        setContactPhone(initialData.contactPhone);
        setContactEmail(initialData.contactEmail);
    }

    const router = useRouter();
    const handleCancel = () => {
        router.back();
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const attorney = {
            name,
            contactAddress,
            contactPhone,
            contactEmail
        }

        try {
            if (id) {
                await attorneyStore.updateAttorney(id, attorney);
            } else {
                await attorneyStore.createAttorney(attorney);
            }

            setSuccess(true);
            setError(false);
        } catch (error) {
            setSuccess(false);
            setError(true);
        }
       
    };

    return (
        <Box>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400,
                    margin: '0 auto',
                    mt: 5,
                }}
                onSubmit={handleSubmit}
            >
                {
                    success ? (
                        <Alert severity="success">
                            Attorney { id ? "updated" : "created " } successfully !
                        </Alert>
                    ) : (<></>)
                } 
                {
                    error ? (
                        <Alert severity="error">
                            An error occured, please try again.
                        </Alert>
                    ) : (<></>)
                }
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                {id ? `${name} Form` : 'Attorney Form'}
            </Typography>
            <TextField
                label="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                variant="outlined"
                fullWidth
                required
            />
            <TextField
                label="Address"
                name="contactAddress"
                value={contactAddress}
                onChange={e => setContactAddress(e.target.value)}
                variant="outlined"
                type="address"
                fullWidth
                required
            />
            <TextField
                label="Phone"
                name="contactPhone"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                variant="outlined"
                type="phone"
                fullWidth
                required
            />
            <TextField
                label="Email"
                name="contactEmail"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                variant="outlined"
                type="email"
                fullWidth
                required
            />
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
            <Button 
                variant="outlined" 
                color="secondary"
                onClick={handleCancel}
            >
                Cancel
            </Button>
            
        </Box>
        { id ? (
            <>
                <Divider sx={{marginY: 2}} />
                <SkeletonAttorneyPricesMapListPanel /> 
            </>
        ) : '' }
    </Box>
  )

}

export default inject(({ store }) => ({ attorneyStore: store.attorney }))(observer(AttorneyForm));