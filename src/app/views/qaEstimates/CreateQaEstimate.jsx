import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Button,
  Alert,
  Snackbar,
  FormControl,
  Grid,
  Icon,
  IconButton,
  styled,
  Select,
  MenuItem,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { Span } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  getAllCategories,
  getAllTasks,
  getWfValuesByCategory,
} from 'app/redux/bi-estimate-list/commonSlice';
import { toInteger, toNumber } from 'lodash';
import { addQaEstimate, clearState } from 'app/redux/bi-estimate-list/qaEstimateSlice';
import AppAlertDialog from '../shared-component/AppAlerts';
import { useCallbackPrompt } from 'app/hooks/useCallbackPrompt';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const CreateQaEstimate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  // const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog);

  const estimateData = useSelector((state) => state.qaEstimates);
  const commonData = useSelector((state) => state.commonData);
  const taskGroupName = [];
  const taskLists = [];
  const simpleWf = [];
  const mediumWf = [];
  const complexWf = [];

  const [showSnackBar, setShowSnackBar] = useState(false);

  const [estimate, setEstimate] = useState({
    categoryId: 3,
    estimatorName: '',
    isActive: 1,
    projectName: '',
    qaName: '',
    qaTaskGroups: [
      {
        isActive: 1,
        qaTasksLists: [
          {
            isActive: 1,
            simple: 0,
            medium: 0,
            complex: 0,
            simpleWf: 0,
            mediumWf: 0,
            complexWf: 0,
            taskListId: 0,
          },
        ],
        taskGroupId: 0,
      },
    ],
    retestingEfforts: 0,
    totalEffortsInPersonDays: 0,
    totalEffortsInPersonHours: 0,
  });

  useEffect(() => {
    if (estimateData.message === 'QA Estimate added successfully!') {
      setShowSnackBar(true);
      setTimeout(() => {
        navigate('/qa/estimate-list');
      }, 500);
    } else if (estimateData.isError) {
      setShowSnackBar(true);
    }
  }, [estimateData]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(getAllCategories());
    dispatch(getAllTasks(3));
    dispatch(getWfValuesByCategory(3));
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = 'Wanna leave?';
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  // useEffect(() => {
  //   if (showDialog && window.confirm('Do you wann leave? Changes not saved yet!')) {
  //     return;
  //   }
  // }, [showDialog]);

  const handleAddTask = (index) => {
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.qaTaskGroups];
    updatedTaskGroup[index].qaTasksLists.push({
      isActive: 1,
      simple: 0,
      medium: 0,
      complex: 0,
      simpleWf: 0,
      mediumWf: 0,
      complexWf: 0,
      taskListId: 0,
    });
    est.qaTaskGroups = updatedTaskGroup;
    setEstimate(est);
  };

  const handleRemoveTask = (taskGroupIndex, taskIndex) => {
    const est = { ...estimate };
    const updatedTasks = [...estimate.qaTaskGroups[taskGroupIndex].qaTasksLists];
    updatedTasks.splice(taskIndex, 1);
    est.qaTaskGroups[taskGroupIndex].qaTasksLists = updatedTasks;
    setEstimate(est);
  };

  const handleAddTaskGroup = () => {
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.qaTaskGroups];
    updatedTaskGroup.push({
      isActive: 1,
      qaTasksLists: [
        {
          isActive: 1,
          simple: 0,
          medium: 0,
          complex: 0,
          simpleWf: 0,
          mediumWf: 0,
          complexWf: 0,
          taskListId: 0,
        },
      ],
      taskGroupId: 0,
    });
    est.qaTaskGroups = updatedTaskGroup;
    setEstimate(est);
  };

  const handleRemoveTaskGroup = (index) => {
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.qaTaskGroups];
    updatedTaskGroup.splice(index, 1);
    est.qaTaskGroups = updatedTaskGroup;
    setEstimate(est);
  };

  const handleRowChange = (event, taskGroupIndex, taskIndex) => {
    const { name, value } = event.target;
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.qaTaskGroups];
    const updatedTasks = updatedTaskGroup[taskGroupIndex].qaTasksLists[taskIndex];
    updatedTasks[name] = toNumber(value);
    updatedTasks['effortDays'] =
      estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].simple *
        estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].simpleWf +
      estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].medium *
        estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].mediumWf +
      estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].complex *
        estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].complexWf;
    updatedTasks['effortHours'] =
      estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].effortDays * 8;

    est.qaTaskGroups = updatedTaskGroup;
    setEstimate(est);

    let totalHours = 0;
    estimate.qaTaskGroups.map((tasks, taskGroupIndex) => {
      return tasks.qaTasksLists.map((task, taskIndex) => {
        totalHours += toInteger(task.effortHours);
        return totalHours;
      });
    });
    setEstimate({
      ...estimate,
      totalEffortsInPersonHours: totalHours,
      retestingEfforts: Math.round((totalHours * 10) / 100),
      totalEffortsInPersonDays: Math.ceil((totalHours + (totalHours * 10) / 100) / 8),
    });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('checkString', (value) => {
      if (value !== estimate.projectName) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule('checkString');
  }, [estimate.projectName]);

  useEffect(() => {
    setShowDialog(true);
  }, [estimate]);

  const handleSubmit = (event) => {
    dispatch(addQaEstimate(estimate));
  };

  const handleChange = (event) => {
    event.persist();
    setEstimate({ ...estimate, [event.target.name]: event.target.value });
  };

  const handleChangeGroupName = (event, index) => {
    // event.persist();
    const { name, value } = event.target;
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.qaTaskGroups];
    updatedTaskGroup[index][name] = value;
    est.qaTaskGroups = updatedTaskGroup;
    setEstimate(est);
  };

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackBar(false);
  }

  if (commonData && !commonData.isLoading) {
    commonData.allTaskLists &&
      commonData.allTaskLists[1].map((item, index) => {
        item.TaskGroup.map((list, index) => {
          taskGroupName.push({ key: list.taskGroupID, value: list.taskGroupName });
          list.TaskLists.map((listItem, index) => {
            taskLists.push({
              key: listItem.taskID,
              value: listItem.taskListName,
              refTaskGroup: list.taskGroupID,
            });
          });
        });
      });
    commonData.allWfValues &&
      commonData.allWfValues[1][0].WorkFactor.map((item, index) => {
        simpleWf.push({ key: item.simpleWf, value: item.simpleWf });
        mediumWf.push({ key: item.mediumWf, value: item.mediumWf });
        complexWf.push({ key: item.complexWf, value: item.complexWf });
      });
  }

  const ShowAlert = () => {
    return (
      <>
        <Snackbar
          open={showSnackBar}
          onClose={handleClose}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
      </>
    );
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Create QA Estimate', path: '/qa' }, { name: 'QA Estimate' }]}
        />
      </Box>

      {/* <AppAlertDialog
        showDialog={showPrompt}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      /> */}

      {estimateData.message && <ShowAlert />}

      <ValidatorForm onSubmit={handleSubmit} onError={(errors) => console.log(errors)}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="projectName"
              value={estimate.projectName || ''}
              onChange={handleChange}
              label="Project Name"
              errorMessages={['This field is required', '', 'Max character limit reached']}
              validators={['required', 'minStringLength: 1', 'maxStringLength: 20']}
            />

            <TextField
              type="text"
              name="estimatorName"
              value={estimate.estimatorName || ''}
              label="Estimator Name"
              onChange={handleChange}
              errorMessages={['This field is required', '', 'Max character limit reached']}
              validators={['required', 'minStringLength: 1', 'maxStringLength: 20']}
            />

            <TextField
              type="text"
              name="qaName"
              label="QA Name"
              onChange={handleChange}
              value={estimate.qaName || ''}
              errorMessages={['This field is required', '', 'Max character limit reached']}
              validators={['required', 'minStringLength: 1', 'maxStringLength: 20']}
            />
          </Grid>
        </Grid>

        <SimpleCard title="Task Details">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={250} align="center">
                    Task Name
                  </TableCell>
                  <TableCell width={75} align="center">
                    Simple
                  </TableCell>
                  <TableCell width={75} align="center">
                    Medium
                  </TableCell>
                  <TableCell width={75} align="center">
                    Complex
                  </TableCell>
                  <TableCell align="center">S.WF</TableCell>
                  <TableCell align="center">M.WF</TableCell>
                  <TableCell align="center">C.WF</TableCell>
                  <TableCell width={85} align="center">
                    Effort in Days
                  </TableCell>
                  <TableCell width={80} align="center">
                    Effort in Hrs
                  </TableCell>
                  <TableCell width={80} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estimate &&
                  estimate.qaTaskGroups &&
                  estimate.qaTaskGroups.map((taskGroup, taskGroupIndex) => (
                    <>
                      <TableRow key={taskGroupIndex}>
                        <TableCell align="left">
                          <FormControl fullWidth={true} sx={{ m: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Select Task Group</InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              name="taskGroupId"
                              value={estimate.qaTaskGroups[taskGroupIndex].taskGroupId}
                              label="Task Group"
                              onChange={(e) => handleChangeGroupName(e, taskGroupIndex)}
                            >
                              {taskGroupName.map((option) => (
                                <MenuItem key={option.value} value={option.key}>
                                  {option.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell colSpan={8} align="left"></TableCell>
                        <TableCell align="center">
                          {taskGroupIndex !== 0 && (
                            <IconButton onClick={() => handleRemoveTaskGroup(taskGroupIndex)}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>

                      {taskGroup.qaTasksLists.map((task, taskIndex) => (
                        <TableRow key={taskIndex}>
                          <TableCell align="left">
                            <FormControl fullWidth={true} sx={{ m: 1 }} size="small">
                              <InputLabel id="demo-select-small-label1">Select Task</InputLabel>
                              <Select
                                labelId="demo-select-small-label1"
                                id="demo-select-small1"
                                name="taskListId"
                                value={
                                  estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex]
                                    .taskListId
                                }
                                label="Task List"
                                onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                              >
                                {taskLists.map((option, index) =>
                                  option['refTaskGroup'] ===
                                  estimate.qaTaskGroups[taskGroupIndex].taskGroupId ? (
                                    <MenuItem key={option.value} value={option.key}>
                                      {option.value}
                                    </MenuItem>
                                  ) : null
                                )}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell width={500}>
                            <TextField
                              name="simple"
                              value={
                                estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].simple
                              }
                              onChange={(e) => {
                                handleRowChange(e, taskGroupIndex, taskIndex);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="medium"
                              value={
                                estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex].medium
                              }
                              onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="complex"
                              value={
                                estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex]
                                  .complex
                              }
                              onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                            />
                          </TableCell>

                          <TableCell align="left">
                            <FormControl fullWidth={true} sx={{ m: 1 }} size="small">
                              <InputLabel id="demo-select-small-label1">
                                Select Simple WF
                              </InputLabel>
                              <Select
                                labelId="demo-select-small-label1"
                                id="demo-select-small1"
                                name="simpleWf"
                                value={
                                  estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex]
                                    .simpleWf
                                }
                                label="Simple WF"
                                onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                              >
                                {simpleWf.map((option) => (
                                  <MenuItem key={option.value} value={option.key}>
                                    {option.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="left">
                            <FormControl fullWidth={true} sx={{ m: 1 }} size="small">
                              <InputLabel id="demo-select-small-label1">
                                Select Medium WF
                              </InputLabel>
                              <Select
                                labelId="demo-select-small-label1"
                                id="demo-select-small1"
                                name="mediumWf"
                                value={
                                  estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex]
                                    .mediumWf
                                }
                                label="Medium WF"
                                onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                              >
                                {mediumWf.map((option) => (
                                  <MenuItem key={option.value} value={option.key}>
                                    {option.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="left">
                            <FormControl fullWidth={true} sx={{ m: 1 }} size="small">
                              <InputLabel id="demo-select-small-label1">
                                Select Comple WF
                              </InputLabel>
                              <Select
                                labelId="demo-select-small-label1"
                                id="demo-select-small1"
                                name="complexWf"
                                value={
                                  estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex]
                                    .complexWf
                                }
                                label="Complex WF"
                                onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                              >
                                {complexWf.map((option) => (
                                  <MenuItem key={option.value} value={option.key}>
                                    {option.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>

                          <TableCell>
                            <TextField
                              name="effortDays"
                              value={
                                estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex]
                                  .effortDays
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="effortHours"
                              value={
                                estimate.qaTaskGroups[taskGroupIndex].qaTasksLists[taskIndex]
                                  .effortHours
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            {taskIndex !== 0 && (
                              <IconButton
                                onClick={() => handleRemoveTask(taskGroupIndex, taskIndex)}
                              >
                                <DeleteOutlineIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow key={taskGroupIndex}>
                        <TableCell colSpan={10} align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleAddTask(taskGroupIndex)}
                            type="button"
                            sx={{ mr: 1 }}
                          >
                            <Icon>control_point</Icon>
                            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Add Task</Span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}

                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleAddTaskGroup}
                      type="button"
                      sx={{ mr: 1 }}
                    >
                      <Icon>control_point</Icon>
                      <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Add Task Group</Span>
                    </Button>
                  </TableCell>
                </TableRow>
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
                  {estimate.totalEffortsInPersonHours + '.00 Hrs'}
                </TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">Retesting Efforts (10%)</TableCell>
                <TableCell align="center">{estimate.retestingEfforts + '.00 Hrs'}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">Total Efforts (In Person Days)</TableCell>
                <TableCell align="center">{estimate.totalEffortsInPersonDays + ' Days'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button color="primary" variant="contained" type="submit" sx={{ mr: 1 }}>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
        <Button color="primary" variant="contained" type="button">
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Cancel</Span>
        </Button>
      </ValidatorForm>
    </Container>
  );
};

export default CreateQaEstimate;
