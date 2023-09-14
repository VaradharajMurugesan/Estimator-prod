import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleTable from "../material-kit/tables/SimpleTable";
import {
    Button,
    Box,
    Alert,
    Grid, Card,
    Icon,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useBeforeUnload, useLocation, useNavigate } from 'react-router-dom';
import { addEtlEstimate, clearState, getEtlEstimates } from '../../redux/bi-estimate-list/etlEstimateSlice'

import { MatxLoading } from 'app/components'
import PaginationTable from './shared/PaginationTable';
import useAuth from 'app/hooks/useAuth';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const EtlEstimateList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();

    const estimates = useSelector((state) => state.etlEstimates);

    useEffect(() => {
        dispatch(clearState());
        dispatch(getEtlEstimates())
    }, [])


    if (estimates.isLoading) {
        return <MatxLoading />
    }


    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Estimate List", path: "/etl" }, { name: "ETL Estimate" }]} />
            </Box>

            <SimpleCard>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Card sx={{ px: 3, py: 0 }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton color="primary" type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Card>
                    <Button disabled={!user.permissions.includes('EtlCreate')} color="primary" variant="contained" type="button" onClick={() => navigate('/etl/create-etl-estimate')}>
                        <AddCircleOutlineIcon />
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Create ETL Estimate</Span>
                    </Button>
                </Box>
                {estimates.etlEstimateList && (estimates.etlEstimateList.length === 0 ? <Alert sx={{ mt: 2 }} severity="info"> No records found!</Alert> :
                    <PaginationTable estimates={estimates.etlEstimateList} />)}
            </SimpleCard>
        </Container>
    );
};

export default EtlEstimateList;