'use client';

import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { paper } from 'src/theme/styles';


// ----------------------------------------------------------------------

export function CareerApplicationsListView() {
  const [tableData, setTableData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching data - replace with your API call
    const fetchData = async () => {
      const response = {
        message: "Career applications retrieved successfully!",
        data: [
          {
            fullName: "John Doe",
            email: "johndoe@example.com",
            phoneNumber: "1234567890",
            country: "Canada",
            cv: "/uploads/cv/johndoe.pdf",
            photo: "/uploads/photos/johndoe.jpg",
            motivationLetter: "/uploads/motivationLetter/johndoe.pdf",
          },
        ],
        totalPages: 5,
        currentPage: 1,
        totalItems: 50,
      };
      setTableData(response.data);
    };
    fetchData();
  }, []);

  const handleDeleteRow = (id) => {
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
    toast.success('Delete success!');
  };

  const handleDeleteRows = () => {
    const updatedData = tableData.filter((row) => !selectedRowIds.includes(row.id));
    setTableData(updatedData);
    setConfirmDeleteOpen(false);
    toast.success('Deleted selected items!');
  };

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
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mb: 3 }} >
        <CustomBreadcrumbs
          heading="Career Applications"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Career' },
          ]}
        />

        <Card sx={{ flexGrow: 1, mt: 3 }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={(row) => row.email} // Use unique field as ID
            onRowSelectionModelChange={(newSelection) => setSelectedRowIds(newSelection)}
            components={{
              Toolbar: () => (
                <GridToolbarContainer>
                  <GridToolbarQuickFilter />
                  {selectedRowIds.length > 0 && (
                    <Button
                      color="error"
                      onClick={() => setConfirmDeleteOpen(true)}
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    >
                      Delete Selected ({selectedRowIds.length})
                    </Button>
                  )}
                </GridToolbarContainer>
              ),
            }}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Box>

      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
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
