import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Button,
    Select,
    MenuItem,
    Paper,
    Checkbox,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { BACKEND_API_URL } from "../constants";
  import { UserRoles } from "../models/UserRoles";
  import { Paginator } from "./pagination/Pagination";
  
  const UsersBulk = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
    const rowsPerPage = 10;
  
    useEffect(() => {
      setLoading(true);
  
      const stringUser = localStorage.getItem("user");
      const user = JSON.parse(stringUser!);
      const new_page_size = user?.page_size || 10;
  
      fetch(`${BACKEND_API_URL}/users/?page=${page}&page_size=${new_page_size}`)
        .then((res) => res.json())
        .then((data) => {
          const { count, next, prev, results } = data;
          setIsLastPage(!next);
          setTotalRows(count);
          setUsers(results);
          setLoading(false);
        });
    }, [page]);
  
    const setCurrentPage = (newPage: number) => {
      setPage(newPage);
    };
  
    const goToNextPage = () => {
      if (isLastPage) {
        return;
      }
  
      setPage(page + 1);
    };
  
    const goToPrevPage = () => {
      if (page === 1) {
        return;
      }
  
      setPage(page - 1);
    };
    const handleRowSelection = (userId: number) => {
        if (selectedRows.includes(userId)) {
          setSelectedRows(selectedRows.filter((id) => id !== userId));
        } else {
          setSelectedRows([...selectedRows, userId]);
        }
      };
      
      const handleBulkDelete = () => {
        axios({
            method: 'delete',
            url: `${BACKEND_API_URL}/userBulk/${selectedRows.join(",")}/`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then(() => {
              // Update the user list immediately after successful bulk delete
              fetch(`${BACKEND_API_URL}/users/?page=${page}&page_size=${rowsPerPage}`)
                .then(res => res.json())
                .then(data => {
                  const { count, next, prev, results } = data;
                  setIsLastPage(!next);
                  setTotalRows(count);
                  setUsers(results);
                })
                .catch(error => {
                  console.error("Error fetching user list:", error);
                });
            })
            .catch((error) => {
              console.error("Error deleting users:", error);
            });
          
      };
    
  
    return (
      <Container>
        <h1>All users</h1>
  
        {loading && <CircularProgress />}
  
        {!loading && users.length === 0 && <div>No users found</div>}
  
        {!loading && users.length > 0 && (
          <>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 800 }}
                aria-label="simple table"
                style={{ backgroundColor: "whitesmoke" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ color: "#2471A3", fontWeight: "bold" }}
                      align="center"
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{ color: "#2471A3", fontWeight: "bold" }}
                      align="center"
                    >
                      Username
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleBulkDelete}
                        disabled={selectedRows.length === 0}
                        >
                        Bulk Delete
                        </Button>
                        </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user: UserRoles, index) => (
                        <TableRow key={user.id}>
                            <TableCell sx={{ color: "#2471A3" }} align="center">
                            {(page - 1) * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell sx={{ color: "#2471A3" }} align="center">
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                            </TableCell>
                            <TableCell align="center">
                            <Checkbox
                                checked={selectedRows.includes(user.id)}
                                onChange={() => handleRowSelection(user.id)}
                            />
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>

                <Paginator
                    rowsPerPage={rowsPerPage}
                    totalRows={totalRows}
                    currentPage={page}
                    isFirstPage={page === 1}
                    isLastPage={isLastPage}
                    setPage={setCurrentPage}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}
                />
                </>
            )}
            </Container>
  
);
};

export default UsersBulk;