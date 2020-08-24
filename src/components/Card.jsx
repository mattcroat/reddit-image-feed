import React, { useState, useEffect } from '@pika/react';

import Image from '/@components/Image';
import { staggerAnimation } from '/@utilities/';

const Card = ({
  index,
  image,
  title,
  link,
  thumbnail,
  created,
  upvotes,
  authorUrl,
  author,
  lastElement,
  setRef,
}) => (
  <div
    ref={lastElement ? setRef : null}
    className="flex flex-col bg-gray-800 shadow-lg rounded-sm overflow-hidden mb-4"
    style={{
      animation: `
          ${staggerAnimation('slideUp', 0.3, index * 0.1, 'ease')},
          ${staggerAnimation('fadeIn', 0.3, index * 0.1, 'ease-in')}
        `,
    }}
  >
    <Image image={image} thumbnail={thumbnail} alt={title} />
    <div className="p-4 mb-8">
      <h2 className="text-xl font-bold capitalize mb-2">
        <a
          className="hover:underline"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </h2>
      <span className="text-gray-500">{created}</span>
    </div>
    <div className="flex border-t border-gray-900 mt-auto p-4">
      <span className="font-bold">▲ {upvotes}</span>
      <a className="hover:underline ml-auto" href={authorUrl}>
        u/{author}
      </a>
    </div>
  </div>
);

export default Card;
