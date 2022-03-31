import { useEffect, useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Post from "./component/Post";
import Pagination from "./component/Pagination";

function App() {
  interface Provider {
    posts: [];
    title: string;
    url: string;
    created_at: string;
    author: string;
  }

  const [posts, setPosts] = useState<Provider[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [post] = useState(9);

  let num = 0;
  useEffect(() => {
    let interval = setInterval(() => {
      num++;
      const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${num}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data?.hits);
          if (num === 50) {
            clearInterval(interval);
          }
        });
    }, 10000);
  }, [num]);

  // get current post page
  const indexOfLastPost = currentPage * post;
  const indexOfFirstPost = indexOfLastPost - post;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <h2 style={{ margin: "0px", padding: "20px" }}>Posts</h2>
          <Container>
            <Post posts={currentPost} />
            <Pagination
              post={post}
              totalPost={posts.length}
              paginate={paginate}
            />
          </Container>
        </Box>
      </div>
    </div>
  );
}

export default App;
