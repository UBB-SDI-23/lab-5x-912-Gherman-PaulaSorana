import { Button, Container } from "@mui/material";
import { Link } from 'react-router-dom';

export const Statistics = () => {
  return (
    <Container>
      <Button component={Link} to="/statisticsteam/teamsOrd" variant="contained">
        Teams Ordered By No Of Swimmers
      </Button>
    </Container>
  );
};