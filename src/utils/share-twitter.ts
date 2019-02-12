export const shareTwitter = () => {
  const title = 'Tory Satins';
  const description = 'Always Be Around';
  const href = 'https://torysatins.ueno.co';
  const twitter = 'uenodotco';

  const popupConfig = 'left=0,top=0,width=626,height=436,personalbar=0,toolbar=0,scrollbars=0,resizable=0';
  const concat = `${title} — ${description} ${href}`;
  const res = `https://twitter.com/intent/tweet?text=${encodeURIComponent(concat)}&via=${encodeURIComponent(twitter)}`;

  return window.open(res, '', popupConfig);
};
