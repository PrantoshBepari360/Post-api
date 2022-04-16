import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

const columns: (
  | {
      id: string;
      label: string;
      minWidth: number;
      format?: undefined;
    }
  | {
      id: string;
      label: string;
      minWidth: number;
      format: (value: any) => any;
    }
)[] = [
  {
    id: "author",
    label: "Author",
    minWidth: 170,
    format: (value: any) => value.toLocaleString("en-US"),
  },
  {
    id: "created_at",
    label: "Created At",
    minWidth: 170,
    format: (value: any) => value.toLocaleString("en-US"),
  },
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    format: (value: any) => value.toLocaleString("en-US"),
  },
  {
    id: "url",
    label: "URL",
    minWidth: 170,
    format: (value: any) => value.toLocaleString("en-US"),
  },
];

function createData(
  author: string,
  created_at: string,
  title: string,
  url: string,
  json: any
) {
  return { author, created_at, title, url, json };
}

export default function PostsTable() {
  interface Provider {
    posts: [];
    title: string;
    url: string;
    created_at: string;
    author: string;
    objectID: number;
  }

  const [page, setPage] = React.useState(0);
  const [urlPage, setUrlPage] = React.useState(0);
  const [rowsPerPage] = React.useState(20);
  const [posts, setPosts] = React.useState<Provider[]>([]);
  const [json, setJson] = React.useState();

  React.useEffect(() => {
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

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const showJson = (event: any) => {
    setJson(event);
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
                  .map((post: any) => {
                    createData(
                      post.author,
                      post.created_at,
                      post.title,
                      post.url,
                      json
                    );
                    return (
                      <TableRow
                        sx={{ cursor: "pointer" }}
                        onClick={() => showJson(post)}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={post.objectID}
                      >
                        {columns.map((column) => {
                          const value = post[column.id];
                          return (
                            <TableCell key={column.id}>
                              {column?.format && typeof value === "number"
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
        <Stack spacing={2}>
          <Box
            sx={{
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Pagination
              color="secondary"
              count={(posts?.length - 20) / 20}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Stack>
      </Paper>
      {json && (
        <Paper sx={{ backgroundColor: "#f5f5f5" }}>
          <pre style={{ padding: "30px", overflowX: "scroll" }}>
            <code>{JSON.stringify(json, null, 2)}</code>
          </pre>
        </Paper>
      )}
    </Container>
  );
}
