export const extractYoutubeVideoId = (url: string): string | null => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|[^/]+.+[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
}

export const isValidYoutubeUrl = (url: string) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
};