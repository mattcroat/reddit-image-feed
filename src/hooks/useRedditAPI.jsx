import { useState, useEffect } from '@pika/react';
import axios from 'axios';

import {
  isValidImageUrl,
  getImageUrl,
  formatTime,
  cleanTitle,
  truncateText,
  pause,
} from '/@utilities/';

const URL = {
  CORS: import.meta.env.VITE_CORS_THINGPROXY,
  BASE: import.meta.env.VITE_BASE_URL,
  USER: import.meta.env.VITE_USER_URL,
  API: import.meta.env.VITE_API_URL,
};

const formatPosts = (postsToFormat) => {
  if (!postsToFormat) return;

  return postsToFormat.reduce((structuredPosts, field) => {
    const {
      url,
      id,
      title,
      permalink,
      thumbnail,
      author,
      created_utc: createdUTC,
      ups,
    } = field.data;

    if (isValidImageUrl(url)) {
      const post = {
        id,
        title: truncateText(cleanTitle(title), 50),
        link: `${URL.BASE}${permalink}`,
        thumbnail,
        image: getImageUrl(url),
        author: author.toLowerCase(),
        authorUrl: `${URL.USER}${author}`,
        created: formatTime(createdUTC),
        upvotes: ups,
      };

      structuredPosts.push(post);
    }

    return structuredPosts;
  }, []);
};

const fetchPosts = async (nextPage) => {
  try {
    const { data } = await axios.get(`${URL.CORS}${URL.API}?after=${nextPage}`);
    const retrievedPosts = data.data.children;
    const nextPageCode = data.data.after;
    return { retrievedPosts, nextPageCode };
  } catch (e) {
    console.error('💩', e);
    return { errorMessage: e };
  }
};

let nextPage = '';

const useRedditAPI = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatePosts, setUpdatePosts] = useState(false);

  const getPosts = async () => {
    const { retrievedPosts, nextPageCode, errorMessage } = await fetchPosts(nextPage);
    if (errorMessage) return setError(true);
    nextPage = nextPageCode;

    const newPosts = formatPosts(retrievedPosts);
    setPosts((prevPosts) => ([
      ...prevPosts,
      ...newPosts,
    ]));

    await pause(1000);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
    setLoading(true);
    setError(false);
  }, [updatePosts]);

  return [posts, loading, error, setUpdatePosts];
};

export default useRedditAPI;
