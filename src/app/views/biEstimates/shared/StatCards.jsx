import { Box, Card, Grid, Chip, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  textAlign: 'center',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = (props) => {
  const cardList = [
    { itemName: 'Project Name', itemValue: props.estimateData.projectName, icon: 'group' },
    { itemName: 'Estimator Name', itemValue: props.estimateData.estimatorName, icon: 'group' },
    { itemName: 'BI Name', itemValue: props.estimateData.biName, icon: 'group' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              {/* <Icon className="icon">{item.icon}</Icon> */}
              <Box ml="12px">
                <Chip label={item.itemName} color="primary" />
                <Heading>{item.itemValue}</Heading>
              </Box>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
