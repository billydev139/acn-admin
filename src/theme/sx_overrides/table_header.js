import { gridClasses } from "@mui/material";

export const table_header_sx={
    [`& .${gridClasses.cell}`]: {
      alignItems: 'center !important',
      display: 'inline-flex !important',
      
    },
    "& .MuiDataGrid-container--top [role='row'], & .MuiDataGrid-container--bottom [role='row']": {
      backgroundColor: '#B29146 !important', // Replace with your desired background color
    },
    "& .css-t89xny-MuiDataGrid-columnHeaderTitle ": {
        color: "white !important"
    }, 
    "& .css-157q7pp .MuiDataGrid-columnHeaderTitleContainer": {
        color:"white !important"
    }
  
  }