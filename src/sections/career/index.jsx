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
import { deleteCareerApplication, getCareerApplications } from 'src/apis/careerApi';
import { DashboardContent } from 'src/layouts/dashboard';
import { table_header_sx } from 'src/theme/sx_overrides/table_header';
import { button_sx } from 'src/theme/sx_overrides/button';

// ----------------------------------------------------------------------

export function CareerApplicationsListView() {
  const confirmRows = useBoolean();
  const [tableData, setTableData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [deleteing, setDeleteing] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCareerApplications();
      setTableData(response.data);
    };
    fetchData();
  }, [deleteing]);

  const handleDeleteRow = useCallback(
    (id) => {
      setDeleteing(true);
      deleteCareerApplication(id)
        .then(() => {
          toast.success('Delete success!');
        })
        .catch((error) => {
          console.error('Error deleting application:', error);
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
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    {
      field: 'cv',
      headerName: 'CV',
      width: 100,
      renderCell: (params) => (
        <Button variant="text" href={params.value} target="_blank">
          View CV
        </Button>
      ),
    },
    {
      field: 'motivationLetter',
      headerName: 'Motivation Letter',
      width: 150,
      renderCell: (params) => (
        <Button variant="text" href={params.value} target="_blank">
          View Letter
        </Button>
      ),
    },
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
            heading="Career Applications"
            links={[
              { name: 'Dashboard', href: '/' },
              { name: 'Career' },
            ]}
            // action={
            //   <Button
            //     variant="contained"
            //     startIcon={<Iconify icon="mingcute:add-line" />}
            //     sx={button_sx}
            //   >
            //     New Application
            //   </Button>
            // }
            sx={{ mb: { xs: 3, md: 5 } }}
          />

          <Card sx={{ flexGrow: 1, mt: 3 }}>

            <DataGrid
              checkboxSelection
              disableRowSelectionOnClick
              rows={tableData}
              columns={columns}
              getRowId={(row) => row._id} // Use email as a unique identifier
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
              sx={table_header_sx}
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
