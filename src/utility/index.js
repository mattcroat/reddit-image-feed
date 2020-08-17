const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

const isValidImageUrl = url => {
  if ((!url && typeof url !== 'string') || url.length === 0) return;

  const allowedExtensions = /\.(jpe?g|png|gif)$/i;
  if (url.match(allowedExtensions)) return true;
};

const getImageUrl = url => {
  if ((!url && typeof url !== 'string') || url.length === 0) return;

  const isGifv = /\.(gifv)$/i;
  if (url.match(isGifv)) return url.replace('gifv', 'gif');
  return url;
};

const getDate = (timestamp, locale = 'en-GB') => {
  if ((!timestamp && isNaN(timestamp)) || typeof locale !== 'string') return;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // 1595917418 => "Tuesday, 28 July 2020"
  return new Date(timestamp * 1000).toLocaleDateString(locale, options);
};

const formatDate = timestamp => {
  if ((!timestamp && isNaN(timestamp))) return;

  const timeFormat = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  
  const msPerHour = 60 * 60 * 1000; // 1min = 60s 1hr = 60min 3600s/hr * milliseconds
  const msTimestamp = timestamp * 1000; // convert to milliseconds
  const hours = Math.ceil((msTimestamp - new Date()) / msPerHour );

  return timeFormat.format(hours, 'hour');
};

const formatTime = timestamp => {
  if ((!timestamp && isNaN(timestamp))) return;

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

  for (let i = 0; i < timeTable.length; i++) {
    let division = timeTable[i];

    if (Math.abs(timeDelta) < division.amount) {
      return time.format(Math.round(timeDelta), division.name);
    }

    timeDelta /= division.amount;
  }
};

const truncate = (text, length = 100) => {
  if (!text || text.length === 0) return;
  const _text = text.replace(/(\[.*?\])|(\(.+\))|([.,!/])|(\d+ ?x?×? ?\d+)|(, ?[a-z]*?)/gi, '').trim();
  return _text.length > length ? `${_text.substring(0, length)}...` : _text;
};

const stagger = (animation, duration = 1, stagger = 200, index, easing = 'ease') => {
  return `${animation} ${duration * stagger * (index + 1)}ms ${easing}`;
}

export { pause, isValidImageUrl, getImageUrl, formatTime, truncate, stagger };
