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
import { getAllVehicles } from 'src/apis/resaleApi';

// ----------------------------------------------------------------------

export function ResaleApplicationsListView() {
    const confirmRows = useBoolean();
    const [tableData, setTableData] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [filterButtonEl, setFilterButtonEl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllVehicles();
            console.log(response);
            setTableData(response.data);
        };
        fetchData();
    }, []);

    const handleDeleteRow = useCallback(
        (id) => {
            const updatedData = tableData.filter((row) => row.email !== id);
            toast.success('Delete success!');
            setTableData(updatedData);
        },
        [tableData]
    );

    const handleDeleteRows = useCallback(() => {
        const updatedData = tableData.filter((row) => !selectedRowIds.includes(row.email));
        toast.success('Delete success!');
        setTableData(updatedData);
        confirmRows.onFalse();
    }, [selectedRowIds, tableData, confirmRows]);

    const columns = [
        { field: 'additionalTitle', headerName: 'Additional Title', width: 180 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'carNumber', headerName: 'Car Number', width: 150 },
        { field: 'chassisNumber', headerName: 'Chassis Number', width: 200 },
        { field: 'fuel', headerName: 'Fuel', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
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
                    onClick={() => console.log('View', params.row)}
                />,
                <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    label="Delete"
                    onClick={() => handleDeleteRow(params.row.carNumber)}
                    sx={{ color: 'error.main' }}
                />,
            ],
        },
    ];



    return (
        <>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mb: 3 }}>
                <CustomBreadcrumbs
                    heading='Resale Requests'
                    links={[
                        { name: 'Dashboard', href: '/' },
                        { name: 'Resale' },
                    ]}
                    action={
                        <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
                            New Application
                        </Button>
                    }
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
                        sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
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
        </>
    );
}
