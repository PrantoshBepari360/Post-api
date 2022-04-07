import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "author", label: "Author", minWidth: 170 },
  { id: "created_at", label: "Created At", minWidth: 170 },
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "url",
    label: "URL",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(author, created_at, title, url) {
  return { author, created_at, title, url };
}

export default function PostsTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [urlPage, setUrlPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${urlPage}`
      );
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.hits]);
    };

    const interval = setInterval(() => {
      setUrlPage(urlPage + 1);
    }, 10000);

    fetchPosts();

    return () => clearInterval(interval);
  }, [urlPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {posts &&
                posts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((post) => {
                    createData(post.author, post.created_at, post.title, post.url);
                    return (
                      <TableRow
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/post/${post.objectID}`)}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={post.objectID}
                      >
                        {columns.map((column) => {
                          const value = post[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
