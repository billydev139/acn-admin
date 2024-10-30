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
import { getAllContactRequests } from 'src/apis/contactApi';

// ----------------------------------------------------------------------

export function ContactApplicationsListView() {
    const confirmRows = useBoolean();
    const [tableData, setTableData] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [filterButtonEl, setFilterButtonEl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllContactRequests();
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
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'company', headerName: 'Company', width: 200 },
        { field: 'street', headerName: 'Street', width: 200 },
        { field: 'zipCode', headerName: 'Zip Code', width: 100 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'country', headerName: 'Country', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'supportMessage', headerName: 'Support Message', width: 300 },
        {
            type: 'actions',
            field: 'actions',
            headerName: 'Actions',
            width: 100,
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
                    onClick={() => handleDeleteRow(params.row.email)}
                    sx={{ color: 'error.main' }}
                />,
            ],
        },
    ];




    return (
        <>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mb: 3 }}>
                <CustomBreadcrumbs
                    heading='Contact Applications'
                    links={[
                        { name: 'Dashboard', href: '/' },
                        { name: 'Contact' },
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
