import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import useContactsStore from '~/state/useContactsStore';

export type ConfirmResetDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function ConfirmResetDialog(props: ConfirmResetDialogProps) {
  const reset = useContactsStore((state) => state.reset);

  function handleClose() {
    props.setIsOpen(false);
  }

  function handleReset() {
    reset();
    props.setIsOpen(false);
  }

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reset all contacts?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All active, stale, and hidden contacts will be removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReset} color={'error'} autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
