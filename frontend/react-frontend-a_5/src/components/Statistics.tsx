import { Button, Container } from "@mui/material";
import { Link } from 'react-router-dom';

export const Statistics = () => {
  return (
    <Container>
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/statisticsteam/teamsOrd">
        Teams Ordered By No Of Swimmers
      </Button>
    </Container>
  );
};