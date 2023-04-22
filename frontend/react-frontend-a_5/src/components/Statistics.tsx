import { Button, Container } from "@mui/material";
import { Link } from 'react-router-dom';

export const Statistics = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/statisticsteam/teamsOrd">
        Teams Ordered By No Of Swimmers
      </Button>

   
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/statisticsfan/fansOrd">
       Fans Ordered By Avg Yoe OF The Swimmers They Are Fans Of
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/statisticswimmers/swimmerFilter">
       Swimmers Filtered By Years Of Experience
      </Button>
    
    </Container>

  );
};
