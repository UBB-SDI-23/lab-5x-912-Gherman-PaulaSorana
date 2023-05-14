import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Link } from 'react-router-dom';
import { BACKEND_API_URL } from "../constants";

export const DataManagement = () => {

  async function generateData(table: string) {
    try {
        const token = localStorage.getItem("token");
			if (!token) {
                return;
            }
        await axios.post(`${BACKEND_API_URL}/database/${table}/generate/`,  {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    } catch (error: any) {
        console.log(error.response.status);
        return;
    }
    
  }

  async function truncateData(table: string) {
    try {
        const token = localStorage.getItem("token");
			if (!token) {
                return;
            }
        await axios.post(`${BACKEND_API_URL}/database/${table}/truncate/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    } catch (error: any) {
        console.log(error.response.status);
        return;
    }
    
  }



  return (

    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap:2, columnGap:5 }}>
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} component={Link} sx={{ mr: 3 }} to="/teamsBulk">
        BULK DELETE TEAMS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await generateData('teams')}>
        GENERATE TEAMS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await truncateData('teams')}>
        TRUNCATE TEAMS
      </Button>


      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} component={Link} sx={{ mr: 3 }} to="/swimmersBulk">
        BULK DELETE SWIMMERS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await generateData('swimmers')}>
        GENERATE SWIMMERS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await truncateData('swimmers')}>
        TRUNCATE SWIMMERS
      </Button>


      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} component={Link} sx={{ mr: 3 }} to="/coachesBulk">
        BULK DELETE COACHES
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await generateData('coaches')}>
        GENERATE COACHES
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await truncateData('coaches')}>
        TRUNCATE COACHES
      </Button>


      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} component={Link} sx={{ mr: 3 }} to="/fansBulk">
        BULK DELETE FANS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await generateData('fans')}>
        GENERATE FANS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await truncateData('fans')}>
        TRUNCATE FANS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await generateData('swimmerfans')}>
        GENERATE SWIMMERFANS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} onClick={async() => await truncateData('swimmerfans')}>
        TRUNCATE SWIMMERFANS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke', width:"300px"}} component={Link} sx={{ mr: 3 }} to="/usersBulk">
        BULK DELETE USERS
      </Button>
    
    </Box>

  );
};
