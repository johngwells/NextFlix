import videoData from '../data/videos.json';

export const getYoutubeVideos = async url => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const BASE_URL = 'youtube.googleapis.com/youtube/v3';
    const FULL_URL = `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(FULL_URL);

    const data = await response.json();

    if (data?.error) {
      console.error('Youtube API error', data.error);
      return [];
    }

    return data?.items.map(item => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item?.id?.videoId || item.id
      };
    });
  } catch (error) {
    console.error('Something went wrong with the video library', error);
    return [];
  }
};

export const getVideos = searchQuery => {
  const URL = `search?part=snippet&q=${searchQuery}`;
  return getYoutubeVideos(URL);
};

export const getPopularVideos = searchQuery => {
  const URL = `videos?part=snippet&contentDetails&statistics&chart=mostPopular&regionCode=US`
  return getYoutubeVideos(URL)
}