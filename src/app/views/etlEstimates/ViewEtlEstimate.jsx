import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StatCards from './shared/StatCards';
import { getEtlEstimateById } from 'app/redux/bi-estimate-list/etlEstimateSlice';

import { Box, Button, Chip, Grid, styled } from '@mui/material';

import { Span } from 'app/components/Typography';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const ViewEtlEstimate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const estimateData = useSelector((state) => state.etlEstimates);

  useEffect(() => {
    dispatch(getEtlEstimateById(id));
  }, []);

  if (estimateData.isLoading) {
    return <MatxLoading />;
  }

  if (!estimateData || !estimateData.viewEtlEstimate || !estimateData.viewEtlEstimate[1]) {
    return <MatxLoading />;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'View ETL Estimate', path: '/etl/estimate-list' },
            { name: 'ETL Estimate' },
          ]}
        />
      </Box>
      <SimpleCard title={'View ETL Estimate : ' + id}>
        <ContentBox className="analytics">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <StatCards estimateData={estimateData.viewEtlEstimate[1]} />
            </Grid>
          </Grid>
        </ContentBox>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={300} align="center">
                  Task Name
                </TableCell>
                <TableCell align="center">Simple</TableCell>
                <TableCell align="center">Medium</TableCell>
                <TableCell align="center">Complex</TableCell>
                <TableCell align="center">S.WF</TableCell>
                <TableCell align="center">M.WF</TableCell>
                <TableCell align="center">C.WF</TableCell>
                <TableCell align="center">Effort (in Hrs)</TableCell>
                <TableCell align="center">Effort (in Days)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estimateData &&
                estimateData.viewEtlEstimate[1].etlTaskGroups &&
                estimateData.viewEtlEstimate[1].etlTaskGroups.map((taskGroup, taskGroupIndex) => (
                  <>
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Chip color="info" label={'Task Group Name : ' + taskGroup.taskGroupName} />
                      </TableCell>
                    </TableRow>

                    {taskGroup.etlTaskLists &&
                      taskGroup.etlTaskLists.map((task, taskIndex) => (
                        <TableRow key={taskIndex}>
                          <TableCell align="center">{task.taskName}</TableCell>
                          <TableCell align="center">{task.simple}</TableCell>
                          <TableCell align="center">{task.complex}</TableCell>
                          <TableCell align="center">{task.medium}</TableCell>
                          <TableCell align="center">{task.simpleWf}</TableCell>
                          <TableCell align="center">{task.complexWf}</TableCell>
                          <TableCell align="center">{task.mediumWf}</TableCell>
                          <TableCell align="center">{task.effortHours}</TableCell>
                          <TableCell align="center">{task.effortDays}</TableCell>
                        </TableRow>
                      ))}
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SimpleCard>

      <TableContainer sx={{ mt: 2, mb: 2, p: 1 }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">Total Efforts (In Person Hours)</TableCell>
              <TableCell align="center">
                <Chip
                  color="info"
                  label={estimateData.viewEtlEstimate[1].totalEffortsInPersonHours + '.00 Hrs'}
                />
              </TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">Retesting Efforts (10%)</TableCell>
              <TableCell align="center">
                <Chip
                  color="info"
                  label={estimateData.viewEtlEstimate[1].retestingEfforts + '.00 Hrs'}
                />
              </TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">Total Efforts (In Person Days)</TableCell>
              <TableCell align="center">
                <Chip
                  color="info"
                  label={estimateData.viewEtlEstimate[1].totalEffortsInPersonDays + ' Days'}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        color="primary"
        variant="contained"
        type="button"
        sx={{ mr: 1 }}
        href={
          process.env.REACT_APP_API_URL +
          'Etl_download_excel_api/' +
          estimateData.viewEtlEstimate[1].categoryId +
          '/' +
          estimateData.viewEtlEstimate[1].etlEstimatorId
        }
      >
        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Download Estimate</Span>
      </Button>
    </Container>
  );
};

export default ViewEtlEstimate;
