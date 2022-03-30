import { Box, Button, CardContent, Grid } from "@mui/material";
import React from "react";
import { Card } from "@mui/material";

const Post = ({ posts }) => {
  return (
    <>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts.map((post, index) => (
          <Box sx={{ margin: "auto" }} key={index}>
            <Card
              sx={{
                width: "350px",
                height: "300px",
                margin: "2%",
                backgroundColor: "#f8f8f8",
              }}
            >
              <CardContent sx={{ fontSize: "20px", fontWeight: "500" }}>
                Titel: {post?.title}
              </CardContent>

              <CardContent sx={{ fontSize: "18px", fontWeight: "400" }}>
                Created_at: {post?.created_at}
              </CardContent>
              <CardContent sx={{ fontSize: "18px", fontWeight: "400" }}>
                Author: {post?.author}
              </CardContent>
              <CardContent>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={
                    post?.url ||
                    `https://workspaceupdates.googleblog.com/2022/03/compose-with-markdown-in-google-docs-on.html`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outlined">Post Side</Button>
                </a>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Post;
