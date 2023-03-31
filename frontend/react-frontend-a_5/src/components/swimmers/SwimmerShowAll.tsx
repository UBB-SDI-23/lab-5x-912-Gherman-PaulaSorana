import { useEffect, useState } from "react";
import { GlobalURL } from "../../main";
import { Swimmer } from "../../models/Swimmer";


export const SwimmerShowAll = () => {
    const [swimmers, setSwimmers] = useState([]);

    useEffect(() => {
    fetch(GlobalURL + "app1/swimmer/")
        .then(res => res.json())
        .then(data => setSwimmers(data));
    }, []);

    if (swimmers.length === 0){
        return <div>No swimmers</div>
    }
    else
        return (
        <div className="App">
            <h1>Swimmers List</h1>
            <table>
                <tr>
                    <th>#</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>County</th>
                    <th>Date of Birth</th>
                    <th>Years of experience</th>
                    <th>Team Id</th>
                </tr>
                {swimmers.map((swimmer:Swimmer, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{swimmer.swimmer_last_name}</td>
                        <td>{swimmer.swimmer_first_name}</td>
                        <td>{swimmer.swimmer_county}</td>
                        <td>{swimmer.swimmer_date_of_birth}</td>
                        <td>{swimmer.swimmer_years_of_experience}</td>
                        <td>{swimmer.team?.id}</td>
                        {/* <td>{swimmer.fans[index].id}</td> */}
                    </tr>
                ))}
            </table>
        </div>
        );
  }
  
