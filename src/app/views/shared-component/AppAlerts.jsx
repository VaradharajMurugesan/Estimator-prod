import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppAlertDialog(props) {
  return (
    <Box>
      <Dialog
        open={props.showDialog}
        onClose={props.cancelNavigation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have unsaved changes, are you sure you want to leave from this page?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={props.cancelNavigation} color="primary">
            Disagree
          </Button>

          <Button onClick={props.confirmNavigation} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
