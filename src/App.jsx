import React from '@pika/react';

import Card from '/@components/Card';
import Loader from '/@components/Loader';

import useRedditAPI from '/@hooks/useRedditAPI';
import useObserver from '/@hooks/useObserver';

const App = () => {
  const [setRef, intersecting] = useObserver();
  const [posts, loading, error] = useRedditAPI(intersecting);

  const showPosts = posts
    && posts.map((post, index) => (
      <Card
        key={post.id}
        index={index}
        image={post.image}
        title={post.title}
        link={post.link}
        thumbnail={post.thumbnail}
        created={post.created}
        upvotes={post.upvotes}
        authorUrl={post.authorUrl}
        author={post.author}
        lastElement={posts.length === index + 1}
        setRef={setRef}
      />
    ));

  return (
    <>
      {error && 'Error! 💩'}
      <div className="grid md:grid-cols-3 gap-4 p-8">
        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        {showPosts}
      </div>
      {loading && <Loader />}
    </>
  );
};

export default App;
