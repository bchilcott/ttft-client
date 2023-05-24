import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useContactsStore from '~/hooks/useContactsStore';
import Contact from '~/types/Contact';

const columns: GridColDef<Contact>[] = [
  { field: 'trackID', headerName: 'ID', width: 100 },
  { field: 'environment', headerName: 'Environment', width: 150 },
  { field: 'type', headerName: 'Type', width: 70 },
  { field: 'systemID', headerName: 'System ID', width: 120 },
];

export default function ContactsTable() {
  const { contacts, selectOne } = useContactsStore((state) => state);

  return (
    <DataGrid
      density="compact"
      getRowId={(row) => row.trackID}
      rows={contacts}
      columns={columns}
      disableRowSelectionOnClick
      hideFooter
      sx={{
        '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
        '& .MuiDataGrid-row:hover': { cursor: 'pointer' },
      }}
      onRowClick={(params) => {
        const contact = params.row as Contact;
        selectOne(contact.trackID);
      }}
    />
  );
}
