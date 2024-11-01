'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {
    DataGrid, gridClasses,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    GridActionsCellItem,
} from '@mui/x-data-grid';

import { Box, Stack } from '@mui/material';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useBoolean } from 'src/hooks/use-boolean';
import { getCareerApplications } from 'src/apis/careerApi';
import { getAllSalesContacts } from 'src/apis/salesContactApi';
import { deleteVehicle, getAllVehicles } from 'src/apis/resaleApi';
import { DashboardContent } from 'src/layouts/dashboard';
import { button_sx } from 'src/theme/sx_overrides/button';
import { table_header_sx } from 'src/theme/sx_overrides/table_header';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export function ResaleApplicationsListView() {
    const confirmRows = useBoolean();
    const [tableData, setTableData] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [filterButtonEl, setFilterButtonEl] = useState(null);

    const [deleteing, setDeleteing] = useState(false)
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllVehicles();
            console.log(response);
            setTableData(response.data);
        };
        fetchData();
    }, [deleteing]);

    const handleDeleteRow = useCallback(
        (id) => {
            setDeleteing(true);
            deleteVehicle(id)
                .then(() => {
                    toast.success('Delete success!');
                })
                .catch((error) => {
                    console.error('Error Deleting:', error);
                })
                .finally(() => {
                    setDeleteing(false);
                });
        },
        []
    );

    const handleDeleteRows = useCallback(() => {
        const updatedData = tableData.filter((row) => !selectedRowIds.includes(row.email));
        toast.success('Delete success!');
        setTableData(updatedData);
        confirmRows.onFalse();
    }, [selectedRowIds, tableData, confirmRows]);

    const columns = [
        { field: 'additionalTitle', headerName: 'Additional Title', width: 180, disableColumnMenu: true },
        { field: 'brand', headerName: 'Brand', width: 150, disableColumnMenu: true },
        { field: 'carNumber', headerName: 'Car Number', width: 150, disableColumnMenu: true },
        { field: 'chassisNumber', headerName: 'Chassis Number', width: 200, disableColumnMenu: true },
        { field: 'fuel', headerName: 'Fuel', width: 200, disableColumnMenu: true },
        { field: 'price', headerName: 'Price', width: 200, disableColumnMenu: true },
        {
            type: 'actions',
            field: 'actions',
            headerName: ' ',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            getActions: (params) => [
                <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:eye-bold" />}
                    label="View"
                    onClick={() => {
                        const id = params.row._id;
                        router.push(`/dashboard/resale/${id}`);
                    }}
                />,
                <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    label="Delete"
                    onClick={() => handleDeleteRow(params.row._id)}
                    sx={{ color: 'error.main' }}
                />,
            ],
        },
    ];



    return (
        <>
            <DashboardContent>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mb: 3 }}>
                    <CustomBreadcrumbs
                        heading='Resale Requests'
                        links={[
                            { name: 'Dashboard', href: '/' },
                            { name: 'Resale' },
                        ]}
                        // action={
                        //     <Button variant="contained"
                        //         sx={button_sx}
                        //         startIcon={<Iconify icon="mingcute:add-line" />}>
                        //         New Application
                        //     </Button>
                        // }
                        sx={{ mb: { xs: 3, md: 5 } }}
                    />

                    <Card sx={{ flexGrow: 1, mt: 3 }}>

                        <DataGrid
                            checkboxSelection
                            disableRowSelectionOnClick
                            rows={tableData}
                            columns={columns}
                            getRowId={(row) => row._id} // Use _id as a unique identifier
                            pageSizeOptions={[5, 10, 25]}
                            onRowSelectionModelChange={(newSelection) => setSelectedRowIds(newSelection)}

                            components={{
                                Toolbar: () => (
                                    <GridToolbarContainer  >
                                        <GridToolbarQuickFilter />
                                        {!!selectedRowIds.length && (
                                            <Button
                                                color="error"
                                                onClick={() => confirmRows.onTrue()}
                                                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                                            >
                                                Delete Selected ({selectedRowIds.length})
                                            </Button>
                                        )}
                                    </GridToolbarContainer>
                                ),
                            }}
                            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' }, ...table_header_sx }}
                        />
                    </Card>
                </Box>

                <ConfirmDialog
                    open={confirmRows.value}
                    onClose={confirmRows.onFalse}
                    title="Delete Items"
                    content={`Are you sure you want to delete ${selectedRowIds.length} item(s)?`}
                    action={
                        <Button color="error" onClick={handleDeleteRows} variant="contained">
                            Delete
                        </Button>
                    }
                />
            </DashboardContent>
        </>
    );
}
