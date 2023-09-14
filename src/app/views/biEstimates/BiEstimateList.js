import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleTable from "../material-kit/tables/SimpleTable";
import {
    Button, Alert,
    Box,
    Card,
    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { clearState, getBiEstimates } from '../../redux/bi-estimate-list/biEstimateSlice'

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

const BiEstimateList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();

    const estimates = useSelector((state) => state.biEstimates);


    useEffect(() => {
        dispatch(clearState())
        dispatch(getBiEstimates())
    }, [])

    if (estimates.isLoading) {
        return <MatxLoading />
    }


    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Estimate List", path: "/bi/estimate-list" }, { name: "BI Estimate" }]} />
            </Box>

            <SimpleCard>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Card sx={{ px: 3, py: 0 }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Card>
                    <Button disabled={!user.permissions.includes('BiCreate')} color="primary" variant="contained" type="button" onClick={() => navigate('/bi/create-bi-estimate')}>
                        <AddCircleOutlineIcon />
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Create BI Estimate</Span>
                    </Button>
                </Box>

                {estimates.biEstimateList && (estimates.biEstimateList.length === 0 ? <Alert sx={{ mt: 2 }} severity="info"> No records found!</Alert> :
                    <PaginationTable estimates={estimates.biEstimateList} />)}
            </SimpleCard>
        </Container>
    );
};

export default BiEstimateList;