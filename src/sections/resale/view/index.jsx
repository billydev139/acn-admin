'use client';

import React, { memo, useEffect, useState } from 'react';
import { Avatar, Box, Typography, Paper, Stack, ListItemText, ListItem, Card, List, ImageList, ImageListItem } from '@mui/material';
import { paths } from 'src/routes/paths';
import { getVehicleById } from 'src/apis/resaleApi';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { BlankView } from 'src/sections/blank/view';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ResaleViewPage({ id }) {
    const [vehicleData, setVehicleData] = useState(null);
    const router = useRouter()
    useEffect(() => {
        if (!id || id === 'null') {
            toast.warning('please select an item to view')
            router.push('/dashboard/resale');
        }
    }, [id, router]);

    useEffect(() => {
        async function fetchVehicleData() {
            const data = await getVehicleById(id);
            console.log({ data });
            setVehicleData(data);
        }
        if (id && id !== 'null') {
            fetchVehicleData();
        }

    }, [id]);

    if (!vehicleData) return <BlankView />;

    const {
        vehicleType,
        yearOfManufacture,
        brand,
        model,
        constructionType,
        fuel,
        transmissionType,
        vehicleColor,
        price,
        innerColor,
        additionalTitle,
        typeCertificate,
        chassisNumber,
        masterNumber,
        carNumber,
        vehicleCondition,
        kilometers,
        finalExam,
        detailedData,
        comments,
        images,
        contactDetails,
    } = vehicleData.data;
    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="VIew Vehicle"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Resale', href: paths.dashboard.resale.root },
                    { name: `${brand} ${model} - ${yearOfManufacture}` },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />
            <Paper
                elevation={3}
                sx={{
                    position: 'relative',
                    padding: 4,
                    borderRadius: 2,
                    backgroundImage: 'url(/assets/images/mock/cover/cover-15.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    mb: 4,
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            bottom: -40,
                            left: '5%',
                            transform: 'translateX(-10%)',
                            border: '3px solid white',
                            boxShadow: 3,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                        }}
                    >
                        {brand?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box sx={{ ml: 20 }}>
                        <ListItemText
                            primary={
                                <Typography variant="h6" color="white">
                                    {`${brand} ${model} - ${yearOfManufacture}`}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="white">
                                    {additionalTitle}
                                </Typography>
                            }
                        />
                    </Box>
                </Stack>
            </Paper>

            {/* Responsive Flex Layout for Cards */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 4 }}>

                {/* Vehicle Details Card */}
                <Card sx={{ p: 3, flexBasis: { xs: '100%', md: '45%' }, maxWidth: '500px' }}>
                    <Typography variant="h5" gutterBottom>
                        Vehicle Details
                    </Typography>
                    <List>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Type:</Typography>
                                <Typography variant="body2">{vehicleType}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Construction Type:</Typography>
                                <Typography variant="body2">{constructionType}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Fuel Type:</Typography>
                                <Typography variant="body2">{fuel}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Transmission:</Typography>
                                <Typography variant="body2">{transmissionType}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Exterior Color:</Typography>
                                <Typography variant="body2">{vehicleColor}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Interior Color:</Typography>
                                <Typography variant="body2">{innerColor}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Condition:</Typography>
                                <Typography variant="body2">{vehicleCondition}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Kilometers Driven:</Typography>
                                <Typography variant="body2">{`${kilometers} km`}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Final Exam Date:</Typography>
                                <Typography variant="body2">{finalExam}</Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction="row" spacing={2} width="100%">
                                <Typography variant="subtitle1">Price:</Typography>
                                <Typography variant="body2">{`$${price}`}</Typography>
                            </Stack>
                        </ListItem>
                    </List>
                </Card>

                {/* Identifiers and Additional Details in Shared Box */}
                <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: { xs: '100%', md: '45%' }, maxWidth: '500px' }}>
                    <Card sx={{ p: 3, mb: 2, height: '100%' }}>
                        <Typography variant="h5" gutterBottom>
                            Identifiers
                        </Typography>
                        <List>
                            <ListItem>
                                <Stack direction="row" spacing={2} width="100%">
                                    <Typography variant="subtitle1">Type Certificate:</Typography>
                                    <Typography variant="body2">{typeCertificate}</Typography>
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <Stack direction="row" spacing={2} width="100%">
                                    <Typography variant="subtitle1">Chassis Number:</Typography>
                                    <Typography variant="body2">{chassisNumber}</Typography>
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <Stack direction="row" spacing={2} width="100%">
                                    <Typography variant="subtitle1">Master Number:</Typography>
                                    <Typography variant="body2">{masterNumber}</Typography>
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <Stack direction="row" spacing={2} width="100%">
                                    <Typography variant="subtitle1">Car Number:</Typography>
                                    <Typography variant="body2">{carNumber}</Typography>
                                </Stack>
                            </ListItem>
                        </List>
                    </Card>

                    <Card sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h5" gutterBottom>
                            Additional Details
                        </Typography>
                        <List>
                            <ListItem>
                                <Stack direction="row" spacing={2} width="100%">
                                    <Typography variant="subtitle1">Characteristics:</Typography>
                                    <Typography variant="body2">{detailedData?.characteristics.join(', ')}</Typography>
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <Stack direction="row" spacing={2} width="100%">
                                    <Typography variant="subtitle1">Extras:</Typography>
                                    <Typography variant="body2">{detailedData?.extras.join(', ')}</Typography>
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <Stack direction="row" spacing={2} width="100%">
                                    <Typography variant="subtitle1">Comments:</Typography>
                                    <Typography variant="body2">{comments}</Typography>
                                </Stack>
                            </ListItem>
                        </List>
                    </Card>
                </Box>
                <Card sx={{ p: 3, flexBasis: { xs: '100%', md: '45%' }, maxWidth: '500px' }}>
                    <Typography variant="h5" gutterBottom>
                        Contact Information
                    </Typography>
                    <List>
                        <ListItem><ListItemText primary="Name" secondary={`${contactDetails?.salutation} ${contactDetails?.firstName} ${contactDetails?.lastName}`} /></ListItem>
                        <ListItem><ListItemText primary="Email" secondary={contactDetails?.email} /></ListItem>
                        <ListItem><ListItemText primary="Phone Number" secondary={contactDetails?.phoneNumber} /></ListItem>
                        <ListItem><ListItemText primary="Address" secondary={`${contactDetails?.street} ${contactDetails?.houseNumber}, ${contactDetails?.zipCode} ${contactDetails?.location}, ${contactDetails?.country}`} /></ListItem>
                        <ListItem><ListItemText primary="Website" secondary={contactDetails?.website} /></ListItem>
                    </List>
                </Card>
                <Box sx={{ p: 3, flexBasis: { xs: '100%', md: '45%' }, maxWidth: '500px' }}>
                    <Typography variant='h5'>Photos</Typography>
                    <ImageList variant="quilted" cols={4} rowHeight={121} sx={{ marginTop: 3 }}>
                        {images?.map((item, index) => (
                            <ImageListItem key={index} cols={1} rows={item.rows || 1}>
                                <img
                                    alt="none"
                                    {...srcset(item, 121, item.rows, item.cols)}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
                {/* <Card sx={{ p: 3, flexBasis: { xs: '100%', md: '45%' }, width: '100%' }}>


                </Card> */}
            </Box>
        </DashboardContent>
    );
}

export default memo(ResaleViewPage, (prevProps, nextProps) => prevProps.id === nextProps.id);
