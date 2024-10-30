import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';

const rows = [
  { applicant: 'Jaydon Frankie', date: '12 Oct 2022', status: 'Completed', position: 'Full Stack Developer' },
  { applicant: 'Lori Madeson', date: '18 Oct 2022', status: 'Pending', position: 'Frontend Developer' },
  // Add more rows as needed
];

export default function TableComponent() {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: '24px',
        backgroundColor: theme.palette.background.paper, 
        borderRadius: '8px',
      }}
    >
      <Table>
        <TableHead
          sx={{
            backgroundColor: theme.palette.primary.main, 
          }}
        >
          <TableRow>
            <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Applicant</TableCell>
            <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Position</TableCell>
            <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.applicant}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
