import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
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
  Alert,
} from '@mui/material';
import { MatxLoading } from 'app/components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';

import {
  clearState,
  deleteEtlEstimate,
  getEtlEstimates,
} from 'app/redux/bi-estimate-list/etlEstimateSlice';
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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const estimateData = useSelector((state) => state.etlEstimates);

  useEffect(() => {
    if (!estimateData.isLoading) {
      setShowSnackBar(true);
      if (estimateData.etlEstimateDelete) {
        setTimeout(() => {
          dispatch(getEtlEstimates());
          dispatch(clearState());
        }, 500);
      }
    }
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const [estimate, setEstimate] = useState({
    categoryId: 0,
    categoryName: '',
    createdDate: new Date(),
    estimatorName: '',
    etlEstimatorId: 0,
    etlName: '',
    etlTaskGroups: [
      {
        createdDate: new Date(),
        etlEstimatorId: 0,
        etlTaskGroupId: 0,
        etlTaskLists: [
          {
            complex: 0,
            complexWf: 0,
            createdDate: new Date(),
            effortDays: 0,
            effortHours: 0,
            etlTaskGroupId: 0,
            etlTaskListId: 0,
            isActive: 0,
            medium: 0,
            mediumWf: 0,
            simple: 0,
            simpleWf: 0,
            taskListId: 0,
            taskName: '',
            updatedDate: new Date(),
          },
        ],
        isActive: 0,
        taskGroupId: 0,
        taskGroupName: '',
        updatedDate: new Date(),
      },
    ],
    isActive: 1,
    projectName: '',
    retestingEfforts: 0,
    totalEffortsInPersonDays: 0,
    totalEffortsInPersonHours: 0,
    updatedDate: new Date(),
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editEstimate = (data) => {
    navigate('/etl/edit-etl-estimate/' + data.etlEstimatorId);
  };

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackBar(false);
  }

  const confirmFn = (value) => {
    if (value) {
      dispatch(deleteEtlEstimate({ ...estimate, isActive: 0 }));
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
          <> {estimateData.message}</>
        </Alert>
      </Snackbar>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Project Name</TableCell>
            <TableCell align="center">Estimator Name</TableCell>
            <TableCell align="left">ETL Name</TableCell>
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
                <TableCell align="left">{estimates.etlName}</TableCell>
                <TableCell align="center">
                  {new Date(estimates.createdDate).toLocaleDateString('en-IN')}
                </TableCell>
                <TableCell align="center">{'Active'}</TableCell>
                {/* <TableCell align="center">${estimates.amount}</TableCell> */}
                <TableCell align="right">
                  <IconButton
                    onClick={() => navigate('/etl/view-etl-estimate/' + estimates.etlEstimatorId)}
                  >
                    <Icon color="primary">visibility</Icon>
                  </IconButton>
                  <IconButton
                    disabled={!user.permissions.includes('EtlEdit')}
                    onClick={() => editEstimate(estimates)}
                  >
                    <Icon color="secondary">edit</Icon>
                  </IconButton>
                  <IconButton
                    disabled={!user.permissions.includes('EtlDelete')}
                    onClick={() => {
                      setOpen(true);
                      setEstimate(estimates);
                    }}
                  >
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
