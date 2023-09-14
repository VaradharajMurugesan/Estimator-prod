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
    { itemName: 'QA Name', itemValue: props.estimateData.qaName, icon: 'group' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Box ml="12px" sx={{ textAlign: 'center' }}>
                <Chip label={item.itemName} color="primary" />
                <Heading>{item.itemValue}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
