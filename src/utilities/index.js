const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isValidImageUrl = (url) => {
  if ((!url && typeof url !== 'string') || url.length === 0) return;

  const allowedExtensions = /\.(jpe?g|png|gif)$/i;
  if (url.match(allowedExtensions)) return true;
};

const getImageUrl = (url) => {
  if ((!url && typeof url !== 'string') || url.length === 0) return;

  const isGifv = /\.(gifv)$/i;
  if (url.match(isGifv)) return url.replace('gifv', 'gif');
  return url;
};

const formatTime = (timestamp) => {
  if (!timestamp && isNaN(timestamp)) return;

  const time = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

  const timeTable = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
  ];

  // milliseconds in a second
  const milliseconds = 1000;
  // convert to seconds
  let timeDelta = (new Date(timestamp * milliseconds) - new Date()) / milliseconds;

  for (let i = 0; i < timeTable.length; i += 1) {
    const division = timeTable[i];

    if (Math.abs(timeDelta) < division.amount) {
      return time.format(Math.round(timeDelta), division.name);
    }

    timeDelta /= division.amount;
  }
};

const cleanTitle = (text) => {
  if (!text || text.length === 0) return;
  return text.replace(/(\[.*?\])|(\(.+\))|([.,!/|])|(\d+ ?x?×? ?\d+)|(, ?[a-z]*?)/gi, '').trim();
};

const truncateText = (text, length = 100) => {
  if (!text || text.length === 0) return;
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

const staggerAnimation = (animation, duration, index, easing) => {
  const stagger = 200;
  return `${animation} ${duration * stagger * index}ms ${easing}`;
}

export {
  pause,
  isValidImageUrl,
  getImageUrl,
  formatTime,
  cleanTitle,
  truncateText,
  staggerAnimation,
};
