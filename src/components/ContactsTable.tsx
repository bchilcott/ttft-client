import { Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContacts } from '~/hooks/contacts';
import useContactsStore from '~/hooks/useContactsStore';
import { Contact } from '~/types/Contact';

const columns: GridColDef<Contact>[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'dataSource', headerName: 'Source', width: 300 },
  { field: 'type', headerName: 'Type', width: 300 },
  { field: 'systemId', headerName: 'System ID', width: 200 },
  { field: 'operation', headerName: 'Operation', width: 200 },
];

export default function ContactsTable() {
  const { selectOne } = useContactsStore((state) => state);
  const { data: contacts, isLoading, isError } = useContacts();

  return (
    <Paper sx={{ height: '100%' }} elevation={1}>
      <DataGrid
        getRowId={(row) => row.trackId}
        loading={isLoading || isError}
        rows={contacts || []}
        columns={columns}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
          '& .MuiDataGrid-row:hover': { cursor: 'pointer' },
        }}
        onRowClick={(params) => {
          const contact = params.row as Contact;
          selectOne(contact.trackId);
        }}
      />
    </Paper>
  );
}
