import { Button, Container } from "@mui/material";
import { Link } from 'react-router-dom';

export const DataManagement = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/teamsBulk">
        BULK DELETE TEAMS
      </Button>

   
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/swimmersBulk">
        BULK DELETE SWIMMERS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/coachesBulk">
        BULK DELETE COACHES
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/fansBulk">
        BULK DELETE FANS
      </Button>
    
    </Container>

  );
};
