import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

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
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  editBiEstimate,
  getbiEstimateById,
  clearState,
} from 'app/redux/bi-estimate-list/biEstimateSlice';
import {
  getAllCategories,
  getAllTasks,
  getWfValuesByCategory,
} from 'app/redux/bi-estimate-list/commonSlice';
import { toInteger, toNumber } from 'lodash';

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

const EditBiEstimate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const estimateData = useSelector((state) => state.biEstimates);

  const commonData = useSelector((state) => state.commonData);
  const taskGroupName = [];
  const taskLists = [];
  const simpleWf = [];
  const mediumWf = [];
  const complexWf = [];

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [taskList, settaskList] = useState([
    {
      taskGroupname: null,
      tasks: [
        {
          taskListId: 0,
          simple: 0,
          medium: 0,
          complex: 0,
          simpleWF: 0,
          mediumWF: 0,
          complexWF: 0,
          isActive: 1,
        },
      ],
    },
  ]);

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
    dispatch(getAllCategories());
    dispatch(getAllTasks(1));
    dispatch(getWfValuesByCategory(1));
    dispatch(getbiEstimateById(id));
  }, []);

  useEffect(() => {
    estimateData && estimateData.viewBiEstimate && setEstimate(estimateData.viewBiEstimate[1]);

    if (estimateData.message === 'BI Estimate updated successfully!') {
      setShowSnackBar(true);
      setTimeout(() => {
        navigate('/bi/view-bi-estimate/' + id);
        dispatch(clearState());
      }, 1000);
    } else if (estimateData.isError) {
      setShowSnackBar(true);
    }
  }, [estimateData]);

  useEffect(() => {
    if (trigger) {
      let totalHours = 0;
      estimate.biTaskGroup.map((tasks, taskGroupIndex) => {
        tasks.biTasks.map((task, taskIndex) => {
          totalHours += toInteger(task.effortHours);
        });
      });
      setEstimate({
        ...estimate,
        totalEffortsInPersonHours: totalHours,
        retestingEfforts: Math.round((totalHours * 10) / 100),
        totalEffortsInPersonDays: Math.ceil((totalHours + (totalHours * 10) / 100) / 8),
      });
    }
    setTrigger(false);
  }, [trigger]);

  const handleAddTask = (index) => {
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.biTaskGroup];
    updatedTaskGroup[index].biTasks.push({
      taskListId: 0,
      isActive: 1,
      simple: 0,
      medium: 0,
      complex: 0,
      simpleWf: 0,
      mediumWf: 0,
      complexWf: 0,
      effortDays: 0,
      effortHours: 0,
    });
    est.biTaskGroup = updatedTaskGroup;
    setEstimate(est);
  };

  const handleRemoveTask = (taskGroupIndex, taskIndex) => {
    const est = { ...estimate };
    const updatedTasks = [...estimate.biTaskGroup[taskGroupIndex].biTasks];
    updatedTasks.splice(taskIndex, 1);
    est.biTaskGroup[taskGroupIndex].biTasks = updatedTasks;
    setEstimate(est);
  };

  const handleAddTaskGroup = () => {
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.biTaskGroup];
    updatedTaskGroup.push({
      isActive: 1,
      taskGroupId: 0,
      biTasks: [
        {
          taskListId: 0,
          isActive: 1,
          simple: 0,
          medium: 0,
          complex: 0,
          simpleWf: 0,
          mediumWf: 0,
          complexWf: 0,
          effortDays: 0,
          effortHours: 0,
        },
      ],
    });
    est.biTaskGroup = updatedTaskGroup;
    setEstimate(est);
  };

  const handleRemoveTaskGroup = (index) => {
    const est = { ...estimate };
    const updatedTaskGroup = [...estimate.biTaskGroup];
    updatedTaskGroup.splice(index, 1);
    est.biTaskGroup = updatedTaskGroup;
    setEstimate(est);
  };

  const handleRowChange = (event, taskGroupIndex, taskIndex) => {
    const { name, value } = event.target;
    setEstimate((prevEstimate) => ({
      ...prevEstimate,
      biTaskGroup: prevEstimate.biTaskGroup.map((tkGroup, index) =>
        taskGroupIndex === index
          ? {
              ...tkGroup,
              biTasks: tkGroup.biTasks.map((task, tkIndex) =>
                taskIndex === tkIndex
                  ? {
                      ...task,
                      [name]: toNumber(value),
                      effortDays:
                        (name === 'simple'
                          ? toNumber(value)
                          : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].simple) *
                          (name === 'simpleWf'
                            ? toNumber(value)
                            : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].simpleWf) +
                        (name === 'medium'
                          ? toNumber(value)
                          : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].medium) *
                          (name === 'mediumWf'
                            ? toNumber(value)
                            : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].mediumWf) +
                        (name === 'complex'
                          ? toNumber(value)
                          : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].complex) *
                          (name === 'complexWf'
                            ? toNumber(value)
                            : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].complexWf),

                      effortHours:
                        ((name === 'simple'
                          ? toNumber(value)
                          : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].simple) *
                          (name === 'simpleWf'
                            ? toNumber(value)
                            : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].simpleWf) +
                          (name === 'medium'
                            ? toNumber(value)
                            : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].medium) *
                            (name === 'mediumWf'
                              ? toNumber(value)
                              : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].mediumWf) +
                          (name === 'complex'
                            ? toNumber(value)
                            : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].complex) *
                            (name === 'complexWf'
                              ? toNumber(value)
                              : estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex]
                                  .complexWf)) *
                        8,
                    }
                  : task
              ),
            }
          : tkGroup
      ),
    }));

    setTrigger(true);
  };

  const handleSubmit = (event) => {
    dispatch(editBiEstimate(estimate));
  };

  const handleChange = (event) => {
    event.persist();
    setEstimate({ ...estimate, [event.target.name]: event.target.value });
  };

  const handleChangeGroupName = (event, taskGroupIndex) => {
    const { name, value } = event.target;

    setEstimate({
      ...estimate,
      biTaskGroup: estimate.biTaskGroup.map((taskGroup, index) =>
        taskGroupIndex === index ? { ...taskGroup, [name]: value } : taskGroup
      ),
    });
  };

  if (estimateData.isLoading) {
    return <MatxLoading />;
  }

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
          routeSegments={[
            { name: 'Edit BI Estimate', path: '/bi/estimate-list' },
            { name: 'Bi Estimate' },
          ]}
        />
      </Box>

      {estimateData.message && <ShowAlert />}

      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => {
          console.log(errors);
        }}
      >
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
              name="biName"
              label="BI Name"
              onChange={handleChange}
              value={estimate.biName || ''}
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
                  estimate.biTaskGroup &&
                  estimate.biTaskGroup.map((taskGroup, taskGroupIndex) => (
                    <Fragment key={taskGroupIndex}>
                      <TableRow>
                        <TableCell align="left">
                          <FormControl fullWidth={true} sx={{ m: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Select Task Group</InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              // id="demo-select-small"
                              name="taskGroupId"
                              value={estimate.biTaskGroup[taskGroupIndex].taskGroupId}
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
                        <TableCell colSpan={8} align="left" key={taskGroupIndex}></TableCell>
                        <TableCell align="center">
                          {taskGroupIndex !== 0 && (
                            <IconButton onClick={() => handleRemoveTaskGroup(taskGroupIndex)}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>

                      {taskGroup.biTasks.map((task, taskIndex) => (
                        <TableRow key={taskIndex}>
                          <TableCell align="left">
                            <FormControl fullWidth={true} sx={{ m: 1 }} size="small">
                              <InputLabel id="demo-select-small-label1">Select Task</InputLabel>
                              <Select
                                labelId="demo-select-small-label1"
                                // id="demo-select-small1"
                                name="taskListId"
                                value={
                                  estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].taskListId
                                }
                                label="Task List"
                                onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                              >
                                {taskLists.map((option, index) =>
                                  option['refTaskGroup'] ===
                                  estimate.biTaskGroup[taskGroupIndex].taskGroupId ? (
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
                              value={estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].simple}
                              onChange={(e) => {
                                handleRowChange(e, taskGroupIndex, taskIndex);
                              }}
                              // validators={['required', 'maxStringLength: 2']}
                              // errorMessages={['This field is required', 'Max character limit reached']}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="medium"
                              value={estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].medium}
                              onChange={(e) => handleRowChange(e, taskGroupIndex, taskIndex)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="complex"
                              value={
                                estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].complex
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
                                // id="demo-select-small1"
                                name="simpleWf"
                                value={
                                  estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].simpleWf
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
                                // id="demo-select-small1"
                                name="mediumWf"
                                value={
                                  estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].mediumWf
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
                                // id="demo-select-small1"
                                name="complexWf"
                                value={
                                  estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex].complexWf
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
                                estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex]
                                  .effortDays || ''
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="effortHours"
                              value={
                                estimate.biTaskGroup[taskGroupIndex].biTasks[taskIndex]
                                  .effortHours || ''
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

                      <TableRow>
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
                    </Fragment>
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

export default EditBiEstimate;
