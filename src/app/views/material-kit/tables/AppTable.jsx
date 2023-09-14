import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./PaginationTable";
import SimpleTable from "./SimpleTable";
import {
  Button,
  Box,
  FormControlLabel,
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
import { useNavigate } from 'react-router-dom';


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = () => {
  
  const navigate = useNavigate();

  return (
    <Container>
       <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Estimation", path: "/bi" }, { name: "BI Estimation" }]} />
      </Box>

      {/* <SimpleCard title="BI Estimations">
        <SimpleTable />
      </SimpleCard> */}

      <SimpleCard>
      

        <Box display="flex" alignItems="center"  justifyContent= "space-between"> 
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
        <Button color="primary" variant="contained" type="button" onClick={() => navigate('/bi/create-bi-view')}>
          <AddCircleOutlineIcon/>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Create Estimate</Span>
        </Button>
        </Box>
      
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
