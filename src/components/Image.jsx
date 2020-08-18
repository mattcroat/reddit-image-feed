import { useState } from 'preact/hooks';

const Image = ({ image, thumbnail, title }) => {
  const [loaded, setLoaded] = useState(false);
  const transition = 'transition-opacity duration-1000 ease-in';
  const opacity = loaded ? 'opacity-100' : 'opacity-0';

  return (
    <div class="h-64 relative overflow-hidden">
      {!loaded && (
        <img
          class="absolute h-full w-full object-cover blur"
          src={thumbnail}
          alt={title}
        />
      )}
      <img
        onLoad={() => setLoaded(true)}
        class={`absolute h-full w-full object-cover ${transition} ${opacity}`}
        src={image}
        alt={title}
      />
    </div>
  );
};

export default Image;
