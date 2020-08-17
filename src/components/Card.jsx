import Image from '/@components/Image';

import { stagger } from '/@utility/';

const Card = ({ index, id, image, title, link, thumbnail, created, upvotes, authorUrl, author, loading }) => {
  return (
    <div
      key={id}
      class="flex flex-col bg-gray-800 shadow-lg rounded-sm overflow-hidden mb-4"
      style={{
        animation: `
          ${stagger('slideUp', 1, 200, index, 'ease')},
          ${stagger('fadeIn', 2.4, 200, index, 'ease-in')}
        ` 
      }}
    >
      <Image image={image} thumbnail={thumbnail} alt={title} />
      <div class="p-4 mb-8">
        <h2 class="text-xl font-bold capitalize mb-2">
          <a class="hover:underline" href={link} target="_blank">
            {title}
          </a>
        </h2>
        <span class="text-gray-500">{created}</span>
      </div>
      <div class="flex border-t border-gray-900 mt-auto p-4">
        <span class="font-bold">▲ {upvotes}</span>
        <a class="hover:underline ml-auto" href={authorUrl}>
          u/{author}
        </a>
      </div>
    </div>
  );
};

export default Card;
