import 'dotenv/config'

import YouTube from 'simple-youtube-api';

const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

const searchVideos = youtube.searchVideos;

export default searchVideos;