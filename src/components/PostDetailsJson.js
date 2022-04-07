import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetailsJson = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  //   fetch post by objectID from  https://hn.algolia.com/api/v1/items/:id
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  return (
    <Container>
      <pre>
        <code>{JSON.stringify(post, null, 2)}</code>
      </pre>
    </Container>
  );
};

export default PostDetailsJson;
