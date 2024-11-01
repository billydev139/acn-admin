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
import { getCorrosionReportById } from 'src/apis/corrosionApi';

function CorrosionViewPage({ id }) {
    const [vehicleData, setVehicleData] = useState(null);
    const router = useRouter()
    useEffect(() => {
        if (!id || id === 'null') {
            toast.warning('please select an item to view')
            router.push('/dashboard/corrosion');
        }
    }, [id, router]);

    useEffect(() => {
        async function fetchCorrosionData() {
            const data = await getCorrosionReportById(id);
            console.log({ data });
            setVehicleData(data);
        }
        if (id && id !== 'null') {
            fetchCorrosionData();
        }

    }, [id]);

    if (!vehicleData) return <BlankView />;

    const { contactDetails, insurance, parts, additionalImage, comments } = vehicleData.data;
    // function srcset(image, size, rows = 1, cols = 1) {
    //     return {
    //         src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    //         srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    //     };
    // }
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="View Corrosion Report"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Resale', href: paths.dashboard.resale.root },
                    { name: `hi` },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

        </DashboardContent>
    );
}

export default memo(CorrosionViewPage, (prevProps, nextProps) => prevProps.id === nextProps.id);
