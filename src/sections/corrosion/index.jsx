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

import { Box, Stack, tableHeadClasses } from '@mui/material';
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
import { deleteCorrosionReport, getAllCorrosionReports } from 'src/apis/corrosionApi';
import { getValueFromValueOptions } from '@mui/x-data-grid/components/panel/filterPanel/filterPanelUtils';
import { DashboardContent } from 'src/layouts/dashboard';
import { button_sx } from 'src/theme/sx_overrides/button';
import { table_header_sx } from 'src/theme/sx_overrides/table_header';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export function CorrosionApplicationsListView() {
    const confirmRows = useBoolean();
    const [tableData, setTableData] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [filterButtonEl, setFilterButtonEl] = useState(null);
    const router = useRouter();
    const [deleteing, setDeleteing] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllCorrosionReports();
            console.log(response);
            setTableData(response.data);
        };
        fetchData();
    }, [deleteing]);

    const handleDeleteRow = useCallback(
        (id) => {
            setDeleteing(true);
            deleteCorrosionReport(id)
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
        {
            field: 'salutation',
            headerName: 'Salutation',
            width: 100, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.salutation || 'N/A'}</span>

        }, {
            field: 'firstName',
            headerName: 'First Name',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.firstName || 'N/A'}</span>
        },

        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.lastName || 'N/A'}</span>
        },
        {
            field: 'company',
            headerName: 'Company',
            width: 200, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.company || 'N/A'}</span>
        },
        {
            field: 'street',
            headerName: 'Street',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.street || 'N/A'}</span>
        },
        {
            field: 'houseNumber',
            headerName: 'House Number',
            width: 120, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.houseNumber || 'N/A'}</span>
        },
        {
            field: 'zipCode',
            headerName: 'Zip Code',
            width: 100, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.zipCode || 'N/A'}</span>
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.location || 'N/A'}</span>
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.country || 'N/A'}</span>
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.phoneNumber || 'N/A'}</span>
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.email || 'N/A'}</span>
        },
        {
            field: 'website',
            headerName: 'Website',
            width: 200, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.contactDetails?.website || 'N/A'}</span>
        },
        {
            field: 'damageData',
            headerName: 'Damage Data',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.insurance?.damageData || 'N/A'}</span>
        },
        {
            field: 'typeOfContract',
            headerName: 'Contract Type',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.insurance?.typeOfContract || 'N/A'}</span>
        },
        {
            field: 'deduction',
            headerName: 'Deduction',
            width: 100, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.insurance?.deduction || 'N/A'}</span>
        },
        {
            field: 'partName',
            headerName: 'Part Name',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.parts?.[0]?.partName || 'N/A'}</span>
        },
        {
            field: 'partDescription',
            headerName: 'Part Description',
            width: 250, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.parts?.[0]?.partDescription || 'N/A'}</span>
        },
        {
            field: 'additionalImage',
            headerName: 'Additional Image',
            width: 150, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.additionalImage || 'N/A'}</span>
        },
        {
            field: 'comments',
            headerName: 'Comments',
            width: 250, disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?.comments || 'N/A'}</span>
        },
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
                    onClick={() => {
                        const id = params.row._id;
                        router.push(`/dashboard/corrosion/${id}`);
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
                        heading='Corrosion Applications'
                        links={[
                            { name: 'Dashboard', href: '/' },
                            { name: 'Corrosion' },
                        ]}
                        // action={
                        //     <Button variant="contained" sx={button_sx} startIcon={<Iconify icon="mingcute:add-line" />}>
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
                            getRowId={(row) => row._id}
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
