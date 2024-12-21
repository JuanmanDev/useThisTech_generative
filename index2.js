import 'dotenv/config'

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import fs from 'fs';

import google from 'googlethis';

import YouTube from 'simple-youtube-api';


// import youtubesearchapi from "youtube-search-api";

import { TikTokSearch } from 'tiktok-search-api'

// import a json file

// import data from './data/source/2024.json' with {type: 'json'}

import { readFileSync } from 'fs';


// import YouTube  from 'youtube-node';

// var youTube = new YouTube();

// youTube.setKey(process.env.YOUTUBE_API_KEY);

// youTube.search('World War z Trailer', 2, function(error, result) {
//   if (error) {
//     console.log(error);
//   }
//   else {
//     console.log(JSON.stringify(result, null, 2));
//   }
// });



const json = readFileSync('./data/source/2024_prices.json');
const data = JSON.parse(json);

console.log(data);


import TikTokScraper from 'tiktok-scraper';

// const data = require('./data/source/2024.json');

import gis from 'async-g-i-s';

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

for (let i = 0; i < data.length; i++) {
  const element = data[i];

  
  // const tiktoks = await TikTokSearch(element.product_name, "asada", 1);

  // console.log(tiktoks);


    // try {
    //     const url = "https://www.tiktok.com/api/search/general/full/?WebIdLastTime=1732565807&aid=1988&app_language=en&app_name=tiktok_web&browser_language=en&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F131.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&data_collection_enabled=false&device_id=7441313401752962592&device_platform=web_pc&device_type=web_h264&focus_state=true&from_page=search&history_len=6&is_fullscreen=false&is_page_visible=true&keyword="
    //      + element.product_name.replaceAll(" ", "%20") + "&odinId=7441313446287688737&offset=0&os=windows&priority_region=&referer=&region=ES&root_referer=https%3A%2F%2Fwww.google.com%2F&screen_height=1440&screen_width=2561&tz_name=Europe%2FMadrid&user_is_login=false&web_search_code=%7B%22tiktok%22%3A%7B%22client_params_x%22%3A%7B%22search_engine%22%3A%7B%22ies_mt_user_live_video_card_use_libra%22%3A1%2C%22mt_search_general_user_live_card%22%3A1%7D%7D%2C%22search_server%22%3A%7B%7D%7D%7D&webcast_language=en&msToken=ZaLStEYHdnZTSlAfkeYzLbs4dUQaS5IJrIwPeqK8pxvANrBeR722PoUCD4hhjdazQ04j7f-CnWjJ6AxOoxVMuw0bQZ0paN9oejIf7-MKv03do8tDe7vt4LzQ1GmnFwWLlk9B3_VcSSQKoNX8K4rxr-NpJA==&X-Bogus=DFSzswV7HA0ANcyttMDlVRvVLFeD&_signature=_02B4Z6wo00001n9O1yAAAIDDGN8-LOS2055.TtOAAPim4b";
    //     const f = await fetch(url);

    //     console.log(f);

    //     const json = await f.text();

    //     console.log(json);

    //     // Search videos by hashtag
    //     const posts = await TikTokScraper.hashtag("samsung", { number: 10 });
    //     console.log(posts);

    //     // Search videos by username
    //     // const userPosts = await TikTokScraper.user('username', { number: 10 });
    //     // console.log(userPosts);

    //     // // Get trending videos
    //     // const trending = await TikTokScraper.trend('', { number: 10 });
    //     // console.log(trending);
    // } catch (error) {
    //     console.error(error);
    // }

    


  // const videos = await youtubesearchapi.GetListByKeyword(element.product_name + "&persist_gl=1&gl=US&hl=en", false, 10, { gl: 'US', hl: 'us'})

  
  const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

  const videos2 = await youtube.searchVideos(element.product_name, 10);

  //console.log(videos);
  console.log("videos");

  // Combine next 4 promises into one with promise.all
  const allResults = await Promise.all([
    await google.image("official images " + element.product_name, {
      query: {
        safe: true,
        // tbs: "isz:l",
      },
    }),
    await google.image(element.product_name + " with people", {
      query: {
        safe: true,
        // tbs: "isz:l",
      },
    }),
    await google.image(element.product_name + " landing", {
      query: {
        safe: true,
        // tbs: "isz:l",
      },
    }),
    await google.image(element.product_name + " wall", {
      query: {
        safe: true,
        // tbs: "isz:l",
      },
    }),
  ]);

  const images = allResults.map(a => a.slice(0, 20)).flat().map((result) => result.url);

  // console.log(images);
  shuffleArray(images);
  // console.log(images);
  console.log("videos END");

  // break;

  
  const { text: description } = await generateText({
    model: openai('gpt-4o'),
    prompt: `tell short description of ${element.product_name}.`,
  });

  const { price, oldPrice, stars } = element;
  console.log(price, oldPrice, stars, description);

  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: `Generate a blog post about the ${element.product_name} in the ${element.category} category to sell it.
    Use markdown to format the post.

    Add emojis to make the post more engaging.

    Add a text in summary at the end of te post to indicate is a good product to buy, and if is on sale add text to dont miss this price.
    Here is an example:


# AirPods Pro 2

The AirPods Pro 2 represent Apple's most advanced wireless earbuds, featuring improved active noise cancellation and superior sound quality.

## Key Features

- H2 chip for advanced audio processing
- Adaptive Audio
- Personalized Spatial Audio
- Enhanced Active Noise Cancellation
- Transparency mode
- Up to 6 hours of listening time

## Sound Quality

- Custom high-excursion Apple driver
- High dynamic range amplifier
- Adaptive EQ
- Custom spatial audio

## Smart Features

- Hey Siri support
- Automatic device switching
- Audio Sharing
- Find My integration
- Precision Finding
- Touch control with volume adjustment

## Battery Life

- 6 hours per charge (ANC on)
- 30 hours total with charging case
- MagSafe charging
- USB-C charging case
    `,
  });
  
  // console.log(text);
  console.log("Data retrieved for " + element.product_name);

  
  const today = new Date();
  // Extract day, month, and year
  let day = today.getDate();
  let month = today.getMonth() + 1; // Months are zero-based
  let year = today.getFullYear();

  // Ensure day and month are two digits
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  let f1 = `---
title: ${element.product_name}
description: 
price: ${price}
oldPrice: ${oldPrice}
createdAt: '${day}-${month}-${year}'
rating: ${stars}

images: [ 
  ${images.map(i => "'" + i + "'").join(", ")}
]
// amazonUrl: 'https://www.amazon.com/s?k=${element.product_name.replaceAll(" ", "-")}&linkCode=ll2&tag=mobilea00cb84-20&linkId=f0f73aed1b768428de1c82b96da2de79&language=en_US&ref_=as_li_ss_tl' #Search for the product on Amazon US and put the link here
// aliexpressUrl: 'https://aliexpress.com/airpods-pro-2'  #Search for the product on Aliexpress and put the link here
videos: 
${videos2.map((video) => 
`  - platform: 'youtube'
    id: '${video.id}'
    title: '${video.title}'`
).join("\n")}
---`; 


  let textToSave = f1 + text;


  // Get the last three digits of the year (YYY)
  //year = ('000' + (year % 1000)).slice(-3);

  // Combine into the desired format
  const formattedDate = `${day}${month}${year}`;

  const dir = './data/generated/';
  // Customize these variables
  const filename = dir + formattedDate + "" + element.product_name.replace(/ /g, "_") + ".md";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the text to the file
  fs.writeFileSync(filename, textToSave);
 
  console.log(i + "%");

}
