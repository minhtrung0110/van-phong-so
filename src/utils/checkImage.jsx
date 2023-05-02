export function imgError(source) {
  source.src = 'https://i.imgur.com/QY4B8Hg.png';
  source.onerror = '';
  return true;
}
