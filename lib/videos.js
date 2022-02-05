import videoData from '../data/videos.json';

import { getWatchedVideos, getMyListVideos } from '../db/hasura.js';

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = 'youtube.googleapis.com/youtube/v3';
  const FULL_URL = `https://${BASE_URL}/${url}&maxResults=18&key=${YOUTUBE_API_KEY}`;

  const response = await fetch(FULL_URL);

  return await response.json();
};

export const getYoutubeVideos = async url => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoData : await fetchVideos(url);

    if (data?.error) {
      console.error('Youtube API error', data.error);
      return [];
    }

    return data?.items.map(item => {
      const id = item?.id?.videoId || item.id;
      return {
        id,
        title: item.snippet.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
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

export const getPopularVideos = () => {
  const URL = `videos?part=snippet&contentDetails&statistics&chart=mostPopular&regionCode=US`;
  return getYoutubeVideos(URL);
};

export const getYoutubeVideoById = videoId => {
  const URL = `videos?part=snippet&contentDetails&statistics&id=${videoId}`;
  return getYoutubeVideos(URL);
};

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return videos?.map(video => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    };
  });
};

export const getMyList = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return videos?.map(video => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    };
  });
};
