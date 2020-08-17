import Card from '/@components/Card';
import Loader from '/@components/Loader';

import useRedditApi from '/@hooks/useRedditApi';

const App = () => {
  const [posts, loading, error] = useRedditApi();

  const showPosts =
    posts &&
    posts.map((post, index) => (
      <Card
        index={index}
        id={post.id}
        image={post.image}
        title={post.title}
        link={post.link}
        thumbnail={post.thumbnail}
        created={post.created}
        upvotes={post.upvotes}
        authorUrl={post.authorUrl}
        author={post.author}
      />
    ));

  return (
    <>
      {loading && <Loader />}
      {error && 'Error! 💩'}
      {!loading && (
        <div class="grid md:grid-cols-3 gap-4 p-8">
          {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
          {showPosts}
        </div>
      )}
    </>
  );
};

export default App;
