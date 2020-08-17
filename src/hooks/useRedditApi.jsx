import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

import { isValidImageUrl, getImageUrl, formatTime, truncate, pause } from '/@utility/';

const URL = {
  CORS: import.meta.env.VITE_CORS_URL,
  BASE: import.meta.env.VITE_BASE_URL,
  USER: import.meta.env.VITE_USER_URL,
  API: import.meta.env.VITE_API_URL,
};

const useRedditApi = () => {
  const [posts, setPosts] = useState([]);
  // const [nextPage, setNextPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(async () => {
    setLoading(true);
    setError(false);

    try {
      const { data } = await axios.get(`${URL.CORS}${URL.API}`);
      const posts = data.data.children;
      // const nextPage = data.data.after;

      const retrievedPosts = posts.reduce((_posts, { data }) => {
        if (isValidImageUrl(data.url)) {
          const post = {
            id: data.id,
            title: truncate(data.title, 50),
            link: `${URL.BASE}${data.permalink}`,
            thumbnail: data.thumbnail,
            image: getImageUrl(data.url),
            author: data.author.toLowerCase(),
            authorUrl: `${URL.USER}${data.author}`,
            created: formatTime(data.created_utc),
            upvotes: data.ups,
          };

          _posts.push(post);
        }

        return _posts;
      }, []);

      setPosts(retrievedPosts);
      // setNextPage(nextPage);
      // await pause(1000);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error('💩', error);
    }
  }, []);

  return [posts, loading, error];
};

export default useRedditApi;
