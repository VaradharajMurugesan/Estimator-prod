import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Snackbar,
} from '@mui/material';
import { MatxLoading } from 'app/components';
import {
  deleteBiEstimate,
  getBiEstimates,
  clearState,
} from 'app/redux/bi-estimate-list/biEstimateSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import useAuth from 'app/hooks/useAuth';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const PaginationTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log(user.permissions);

  const [open, setOpen] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const estimateData = useSelector((state) => state.biEstimates);

  const [estimate, setEstimate] = useState({
    biName: null,
    categoryId: 1,
    estimatorName: null,
    isActive: 1,
    projectName: null,
    retestingEfforts: 0,
    biTaskGroup: [
      {
        isActive: 1,
        taskGroupId: 0,
        biTasks: [
          {
            isActive: 1,
            taskListId: 0,
            simple: 0,
            medium: 0,
            complex: 0,
            simpleWf: 0,
            mediumWf: 0,
            complexWf: 0,
          },
        ],
      },
    ],
    totalEffortsInPersonDays: 0,
    totalEffortsInPersonHours: 0,
  });

  useEffect(() => {
    if (!estimateData.isLoading) {
      setShowSnackBar(true);
      if (estimateData.biEstimateDelete) {
        setTimeout(() => {
          dispatch(getBiEstimates());
          dispatch(clearState());
        }, 500);
      }
    }
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editEstimate = (data) => {
    navigate('/bi/edit-bi-estimate/' + data.biEstimatorId);
  };

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackBar(false);
  }

  const confirmFn = (value) => {
    if (value) {
      dispatch(deleteBiEstimate({ ...estimate, isActive: 0 }));
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  if (!props.estimates) {
    return <MatxLoading />;
  }

  return (
    <Box width="100%" overflow="auto">
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert
          onClose={(ev) => {
            handleClose(ev);
          }}
          severity={estimateData.isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {estimateData.message}
        </Alert>
      </Snackbar>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Project Name</TableCell>
            <TableCell align="center">Estimator Name</TableCell>
            <TableCell align="left">BI Name</TableCell>
            <TableCell align="center">Date of Estimate</TableCell>
            {/* <TableCell align="center">Module Name</TableCell> */}
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.estimates
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((estimates, index) => (
              <TableRow key={index}>
                <TableCell align="left">{estimates.projectName}</TableCell>
                <TableCell align="center">{estimates.estimatorName}</TableCell>
                <TableCell align="left">{estimates.biName}</TableCell>
                <TableCell align="center">
                  {new Date(estimates.createdDate).toLocaleDateString('en-IN')}
                </TableCell>
                <TableCell align="center">{'Active'}</TableCell>
                {/* <TableCell align="center">${estimates.amount}</TableCell> */}
                <TableCell align="right">
                  <IconButton
                    onClick={() => navigate('/bi/view-bi-estimate/' + estimates.biEstimatorId)}
                  >
                    <Icon color="primary">visibility</Icon>
                  </IconButton>

                  <IconButton
                    onClick={() => editEstimate(estimates)}
                    disabled={!user.permissions.includes('BiEdit')}
                  >
                    <Icon color="secondary">edit</Icon>
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setOpen(true);
                      setEstimate(estimates);
                    }}
                    disabled={!user.permissions.includes('BiDelete')}
                  >
                    {/* <IconButton onClick={() => {setOpen({dialogue:true, deleteId:estimates.biEstimatorId})}}> */}
                    <Icon color="error">delete_outline_icon</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={props.estimates.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={(ev) => handleClose(ev)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Are you sure? Do you want to delete this Estimate?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Make sure that you will not need this item. You can not get it back. It is no longer
            available.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => confirmFn(false)} color="primary">
            No
          </Button>

          <Button onClick={() => confirmFn(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaginationTable;
