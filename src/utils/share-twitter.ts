export const shareTwitter = () => {
  const title = 'Introducing Tory Satins (and friends)';
  const description = 'Ueno is turning 5, we made a music for that special moment!';
  const href = 'https://5.ueno.co';
  const twitter = 'uenodotco';

  const popupConfig = 'left=0,top=0,width=626,height=436,personalbar=0,toolbar=0,scrollbars=0,resizable=0';
  const concat = `${title} — ${description} ${href}`;
  const res = `https://twitter.com/intent/tweet?text=${encodeURIComponent(concat)}&via=${encodeURIComponent(twitter)}`;

  return window.open(res, '', popupConfig);
}
