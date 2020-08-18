import { useState, useEffect } from 'preact/hooks';
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
      const retrievedPosts = data.data.children;
      // const nextPage = data.data.after;

      const newPosts = retrievedPosts.reduce((structuredPosts, field) => {
        if (isValidImageUrl(field.data.url)) {
          const post = {
            id: field.data.id,
            title: truncateText(cleanTitle(field.data.title), 50),
            link: `${URL.BASE}${field.data.permalink}`,
            thumbnail: field.data.thumbnail,
            image: getImageUrl(field.data.url),
            author: field.data.author.toLowerCase(),
            authorUrl: `${URL.USER}${field.data.author}`,
            created: formatTime(field.data.created_utc),
            upvotes: field.data.ups,
          };

          structuredPosts.push(post);
        }

        return structuredPosts;
      }, []);

      setPosts(newPosts);
      // setNextPage(nextPage);
      await pause(1000);
      setLoading(false);
    } catch (e) {
      setError(true);
      console.error('💩', e);
    }
  }, []);

  return [posts, loading, error];
};

export default useRedditApi;
