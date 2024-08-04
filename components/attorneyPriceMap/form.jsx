import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Divider, Autocomplete } from '@mui/material';
import { useRouter } from 'next/router';

import Alert from '@mui/material/Alert';

const PriceMapForm = ({ attorneyId, initialData, attorneyStore, courtStore, countyStore, violationStore, priceStore }) => {
    const [id, setId] = useState(null);
    const [attorney, setAttorney]   = useState('');
    const [court, setCourt]         = useState('');
    const [county, setCounty]       = useState('');
    const [violation, setViolation]  = useState('');
    const [points, setPoints]       = useState(0);
    const [price, setPrice]         = useState(0);

    const [success, setSuccess] = useState(false);
    const [error, setError]     = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (attorneyId) {
            addAttorneyReference();
        }

        if (courtStore.courts.length === 0) {
            courtStore.fetchTrafficCourts();
        }

        if (countyStore.counties.length === 0) {
            countyStore.fetchTrafficCounties();
        }

        if (violationStore.violations.length === 0) {
            violationStore.fetchViolations();
        }

        if (initialData) {
            mountFormWithInitialData();
        }
    }, [attorneyId, initialData]);

    const fetchAttorney = async (id) => {
        setLoading(true);
    
        try {
          if (!attorneyStore.attorneys.length) {
            await attorneyStore.fetchAttorneys();
          }
          
          const attorney = attorneyStore.attorneyById(id);
          setLoading(false);
          setError(false);

          return attorney;
        } catch (error) {
            setLoading(false);
            setError(true);
            return null;
        }
      };

    const addAttorneyReference = async () => {
        setAttorney(await fetchAttorney(attorneyId));
    }

    const mountFormWithInitialData = () => {
        setId(initialData.objectId);
        setPoints(initialData.points);
        setPrice(initialData.price);
    }

    const router = useRouter();
    const handleCancel = () => {
        router.back();
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const priceMap = {
            attorney: attorney.objectId,
            court: court || null,
            county: county || null,
            violation: violation || null,
            points,
            price
        }

        try {
            if (id) {
                //await priceStore.updatePrice(id, attorney);
            } else {
                await priceStore.createPrice(priceMap);
            }

            setSuccess(true);
            setError(false);
            router.push(`/attorneys-panel/show/${attorney.objectId}`);
        } catch (error) {
            console.log(error);
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
                            Price Map { id ? "updated" : "created " } successfully !
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
                Price Map Form
            </Typography>
            {
                attorney && (
                    <TextField
                        label="Attorney"
                        name="Attorney"
                        value={attorney.name}
                        variant="outlined"
                        fullWidth
                        required
                        disabled
                    />
                )
            }
            <Autocomplete
                id="court"
                options={courtStore.courts}
                getOptionLabel={(court) => court.disp_name()}
                onChange={(event, court) => setCourt(court.objectId || null)}
                renderInput={(params) => <TextField {...params} label="Court" />}
            />
            {court}
            <Autocomplete
                id="county"
                options={countyStore.counties}
                getOptionLabel={(county) => county.disp_name()}
                onChange={(event, county) => setCounty(county.objectId || null)}
                renderInput={(params) => <TextField {...params} label="County" />}
            />
            {county}
            <Autocomplete
                id="violation"
                options={violationStore.violations}
                getOptionLabel={(violation) => violation.disp_name()}
                onChange={(event, violation) => setViolation(violation.objectId || null)}
                renderInput={(params) => <TextField {...params} label="Violation" />}
            />
            {violation}
            <TextField
                id="points"
                label="Points"
                value={points}
                type="number"
                onChange={e => setPoints(e.target.value)}
                variant="outlined"
                required
                fullWidth
            />
            <TextField
                id="price"
                label="Price ($)"
                value={price}
                type="number"
                onChange={e => setPrice(e.target.value)}
                variant="outlined"
                required
                fullWidth
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
    </Box>
  )

}

export default inject(({ store }) => ({ attorneyStore: store.attorney, 
                                            courtStore: store.court, 
                                            countyStore: store.county, 
                                            violationStore: store.violation, 
                                            priceStore: store.attorneyPriceMap }))(observer(PriceMapForm));