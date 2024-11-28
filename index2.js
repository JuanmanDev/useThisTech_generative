import 'dotenv/config'

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import fs from 'fs';

import google from 'googlethis';


import TikTokScraper from 'tiktok-scraper';

import youtubesearchapi from "youtube-search-api";

import { TikTokSearch } from 'tiktok-search-api'

const data = [
  {
    "product_name": "Apple iPhone 14 Pro Max",
    "category": "Smartphones"
  },
  {
    "product_name": "Samsung Galaxy S22 Ultra",
    "category": "Smartphones"
  },
  {
    "product_name": "Apple MacBook Pro M2",
    "category": "Laptops"
  },
  {
    "product_name": "Apple AirPods Pro (2nd Generation)",
    "category": "Wireless Earbuds"
  },
  {
    "product_name": "Amazon Echo Dot (4th Generation)",
    "category": "Smart Speakers"
  },
  {
    "product_name": "Apple iPad Pro (2022)",
    "category": "Tablets"
  },
  {
    "product_name": "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    "category": "Headphones"
  },
  {
    "product_name": "Nintendo Switch OLED Model",
    "category": "Gaming Consoles"
  },
  {
    "product_name": "Fitbit Charge 5",
    "category": "Fitness Trackers"
  },
  {
    "product_name": "Microsoft Surface Pro 8",
    "category": "2-in-1 Laptops"
  },
  {
    "product_name": "GoPro HERO10 Black",
    "category": "Action Cameras"
  },
  {
    "product_name": "Apple Watch Series 8",
    "category": "Smartwatches"
  },
  {
    "product_name": "Kindle Paperwhite (2021)",
    "category": "E-readers"
  },
  {
    "product_name": "Samsung Galaxy Tab S8",
    "category": "Tablets"
  },
  {
    "product_name": "Bose QuietComfort 45 Headphones",
    "category": "Headphones"
  },
  {
    "product_name": "Google Pixel 7 Pro",
    "category": "Smartphones"
  },
  {
    "product_name": "DJI Mini 3 Pro Drone",
    "category": "Drones"
  },
  {
    "product_name": "Roku Streaming Stick 4K",
    "category": "Streaming Devices"
  },
  {
    "product_name": "Anker PowerCore Portable Charger",
    "category": "Portable Chargers"
  },
  {
    "product_name": "Logitech MX Master 3S Mouse",
    "category": "Computer Mice"
  },
  {
    "product_name": "LG C2 OLED TV",
    "category": "Televisions"
  },
  {
    "product_name": "Sony PlayStation 5",
    "category": "Gaming Consoles"
  },
  {
    "product_name": "Xbox Series X",
    "category": "Gaming Consoles"
  },
  {
    "product_name": "Apple AirTag",
    "category": "Tracking Devices"
  },
  {
    "product_name": "Netgear Nighthawk WiFi 6 Router",
    "category": "Networking"
  },
  {
    "product_name": "Seagate Portable 2TB External Hard Drive",
    "category": "External Storage"
  },
  {
    "product_name": "Samsung T7 Portable SSD",
    "category": "External Storage"
  },
  {
    "product_name": "Canon EOS R6 Mirrorless Camera",
    "category": "Cameras"
  },
  {
    "product_name": "Jabra Elite 85t Wireless Earbuds",
    "category": "Wireless Earbuds"
  },
  {
    "product_name": "Ring Video Doorbell Pro 2",
    "category": "Smart Home Security"
  },
  {
    "product_name": "Apple Magic Keyboard",
    "category": "Keyboards"
  },
  {
    "product_name": "Dell UltraSharp 27-inch Monitor",
    "category": "Monitors"
  },
  {
    "product_name": "HyperX Cloud II Gaming Headset",
    "category": "Gaming Accessories"
  },
  {
    "product_name": "NVIDIA GeForce RTX 3080 Graphics Card",
    "category": "Computer Components"
  },
  {
    "product_name": "TP-Link Kasa Smart Plug",
    "category": "Smart Home Devices"
  },
  {
    "product_name": "SanDisk Extreme Pro SDXC Memory Card",
    "category": "Memory Cards"
  },
  {
    "product_name": "Philips Hue White and Color Ambiance Starter Kit",
    "category": "Smart Lighting"
  },
  {
    "product_name": "Corsair K95 RGB Platinum Mechanical Gaming Keyboard",
    "category": "Keyboards"
  },
  {
    "product_name": "Garmin Forerunner 955",
    "category": "Fitness Trackers"
  },
  {
    "product_name": "Apple TV 4K (2022)",
    "category": "Streaming Devices"
  },
  {
    "product_name": "Google Nest Learning Thermostat",
    "category": "Smart Home Devices"
  },
  {
    "product_name": "Belkin BoostCharge Pro 3-in-1 Wireless Charger",
    "category": "Charging Accessories"
  },
  {
    "product_name": "Samsung Galaxy Watch5",
    "category": "Smartwatches"
  },
  {
    "product_name": "Alienware Aurora R13 Gaming Desktop",
    "category": "Desktops"
  },
  {
    "product_name": "Razer Blade 15 Gaming Laptop",
    "category": "Laptops"
  },
  {
    "product_name": "WD_BLACK 1TB SN850 NVMe Internal Gaming SSD",
    "category": "Computer Components"
  },
  {
    "product_name": "Lenovo ThinkPad X1 Carbon Gen 10",
    "category": "Laptops"
  },
  {
    "product_name": "Sony Alpha a7 IV Mirrorless Camera",
    "category": "Cameras"
  },
  {
    "product_name": "HP Envy 6055e All-in-One Printer",
    "category": "Printers"
  },
  {
    "product_name": "Echo Show 10 (3rd Gen)",
    "category": "Smart Displays"
  },
  {
    "product_name": "ASUS ROG Strix G15 Gaming Laptop",
    "category": "Laptops"
  },
  {
    "product_name": "Fitbit Versa 4",
    "category": "Fitness Trackers"
  },
  {
    "product_name": "Anker Soundcore Bluetooth Speaker",
    "category": "Speakers"
  },
  {
    "product_name": "Logitech C920 HD Pro Webcam",
    "category": "Webcams"
  },
  {
    "product_name": "Oculus Quest 2 VR Headset",
    "category": "Virtual Reality"
  },
  {
    "product_name": "Canon PIXMA TR8620 All-In-One Printer",
    "category": "Printers"
  },
  {
    "product_name": "Tile Pro (2022) Bluetooth Tracker",
    "category": "Tracking Devices"
  },
  {
    "product_name": "Dell XPS 13 Laptop",
    "category": "Laptops"
  },
  {
    "product_name": "Sonos One (Gen 2) Smart Speaker",
    "category": "Speakers"
  },
  {
    "product_name": "Eufy RoboVac 30C Robot Vacuum",
    "category": "Home Appliances"
  },
  {
    "product_name": "TP-Link Archer AX50 WiFi 6 Router",
    "category": "Networking"
  },
  {
    "product_name": "LG Gram 17-inch Laptop",
    "category": "Laptops"
  },
  {
    "product_name": "Samsung Odyssey G9 Gaming Monitor",
    "category": "Monitors"
  },
  {
    "product_name": "Audio-Technica ATH-M50x Professional Monitor Headphones",
    "category": "Headphones"
  },
  {
    "product_name": "Amazon Fire HD 10 Tablet",
    "category": "Tablets"
  },
  {
    "product_name": "Dyson V11 Torque Drive Cordless Vacuum Cleaner",
    "category": "Home Appliances"
  },
  {
    "product_name": "Blink Outdoor Wireless Security Camera",
    "category": "Smart Home Security"
  },
  {
    "product_name": "Fitbit Sense 2",
    "category": "Smartwatches"
  },
  {
    "product_name": "Apple HomePod mini",
    "category": "Smart Speakers"
  },
  {
    "product_name": "Ring Alarm 8-Piece Kit (2nd Gen)",
    "category": "Smart Home Security"
  },
  {
    "product_name": "ASUS ZenBook Duo 14",
    "category": "Laptops"
  },
  {
    "product_name": "Kasa Smart Light Switch",
    "category": "Smart Home Devices"
  },
  {
    "product_name": "NETGEAR Orbi Mesh WiFi System",
    "category": "Networking"
  },
  {
    "product_name": "Samsung Galaxy Buds2 Pro",
    "category": "Wireless Earbuds"
  },
  {
    "product_name": "MSI GeForce RTX 3090 Gaming X Trio",
    "category": "Computer Components"
  },
  {
    "product_name": "Ring Stick Up Cam Battery",
    "category": "Smart Home Security"
  },
  {
    "product_name": "Google Pixelbook Go",
    "category": "Laptops"
  },
  {
    "product_name": "SteelSeries Apex Pro Mechanical Gaming Keyboard",
    "category": "Keyboards"
  },
  {
    "product_name": "Arlo Pro 4 Spotlight Camera",
    "category": "Smart Home Security"
  },
  {
    "product_name": "HyperX Alloy FPS Pro Mechanical Gaming Keyboard",
    "category": "Keyboards"
  },
  {
    "product_name": "DJI Osmo Mobile 6 Smartphone Gimbal",
    "category": "Photography Accessories"
  },
  {
    "product_name": "Logitech G502 HERO High Performance Gaming Mouse",
    "category": "Computer Mice"
  },
  {
    "product_name": "Samsung 980 PRO SSD",
    "category": "Computer Components"
  },
  {
    "product_name": "Sony SRS-XB43 Portable Bluetooth Speaker",
    "category": "Speakers"
  },
  {
    "product_name": "Tile Mate (2022) Bluetooth Tracker",
    "category": "Tracking Devices"
  },
  {
    "product_name": "Bose SoundLink Revolve+ II Bluetooth Speaker",
    "category": "Speakers"
  },
  {
    "product_name": "Nikon Z6 II Mirrorless Camera",
    "category": "Cameras"
  },
  {
    "product_name": "HP Spectre x360 14",
    "category": "Laptops"
  },
  {
    "product_name": "Anker Nebula Capsule Max Portable Projector",
    "category": "Projectors"
  },
  {
    "product_name": "BenQ HT2050A 1080P Home Theater Projector",
    "category": "Projectors"
  },
  {
    "product_name": "Sonos Beam (Gen 2) Soundbar",
    "category": "Home Audio"
  },
  {
    "product_name": "Razer Kraken Gaming Headset",
    "category": "Gaming Accessories"
  },
  {
    "product_name": "Ring Floodlight Cam Wired Plus",
    "category": "Smart Home Security"
  },
  {
    "product_name": "Samsung Galaxy Book Pro 360",
    "category": "Laptops"
  },
  {
    "product_name": "Nest Cam (Battery)",
    "category": "Smart Home Security"
  },
  {
    "product_name": "Anker PowerConf Bluetooth Speakerphone",
    "category": "Office Electronics"
  },
  {
    "product_name": "WD My Passport 4TB External Hard Drive",
    "category": "External Storage"
  },
  {
    "product_name": "Samsung Galaxy S21 FE",
    "category": "Smartphones"
  },
  {
    "product_name": "Bose Frames Tempo Audio Sunglasses",
    "category": "Wearable Technology"
  },
  {
    "product_name": "Fitbit Inspire 3",
    "category": "Fitness Trackers"
  },
  {
    "product_name": "Canon EOS M50 Mark II Mirrorless Camera",
    "category": "Cameras"
  },
  {
    "product_name": "Belkin USB-C Hub Multiport Adapter",
    "category": "Computer Accessories"
  },
  {
    "product_name": "DJI Mavic 3 Drone",
    "category": "Drones"
  },
  {
    "product_name": "Echo Buds (2nd Gen)",
    "category": "Wireless Earbuds"
  },
  {
    "product_name": "Anker Soundcore Life Q35 Headphones",
    "category": "Headphones"
  },
  {
    "product_name": "Apple Mac Mini M2",
    "category": "Desktops"
  },
  {
    "product_name": "Logitech Brio Ultra HD Webcam",
    "category": "Webcams"
  },
  {
    "product_name": "Eero Pro 6 Mesh Wi-Fi System",
    "category": "Networking"
  },
  {
    "product_name": "HP Reverb G2 Virtual Reality Headset",
    "category": "Virtual Reality"
  },
  {
    "product_name": "Sony Xperia 1 IV",
    "category": "Smartphones"
  },
  {
    "product_name": "JBL Charge 5 Portable Bluetooth Speaker",
    "category": "Speakers"
  },
  {
    "product_name": "Garmin Fenix 7",
    "category": "Smartwatches"
  },
  {
    "product_name": "Logitech StreamCam",
    "category": "Webcams"
  },
  {
    "product_name": "Sennheiser Momentum True Wireless 3 Earbuds",
    "category": "Wireless Earbuds"
  },
  {
    "product_name": "Microsoft Surface Laptop Studio",
    "category": "Laptops"
  }
];

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


  const videos = await youtubesearchapi.GetListByKeyword(element.product_name + "&persist_gl=1&gl=US&hl=en", false, 10, { gl: 'US', hl: 'us'})

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


  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: `Generate a blog post about the ${element.product_name} in the ${element.category} category to sell it.
    Use markdown to format the post.
    
    Searc for iamges on the internet to include in the post, avoid images with copyright.

    Add emojis to make the post more engaging.

    Add a text in summary at the end of te post to indicate is a good product to buy, and if is on sale add text to dont miss this price.
    using this format:
    ---
title: 'Title' 
description: 'Description'
price: 249 #Current price
oldPrice: 279 #Previuos price, if coont find, leave black
createdAt: '2024-03-18' #Date of creation
rating: 4.8 # Update this rating, if you cannot find, use a random number between 4.5 and 5

images: [ 
  ${images.map(i => "'" + i + "'").join(", ")}
]
amazonUrl: 'https://amazon.com/airpods-pro-2' #Search for the product on Amazon US and put the link here
aliexpressUrl: 'https://aliexpress.com/airpods-pro-2'  #Search for the product on Aliexpress and put the link here
videos: # Update this list with this ids: ${videos.items.map((video) => video.id.videoId).join(", ")}
  - platform: 'youtube'
    id: 'v6EjmbMgv80'
    title: 'AirPods Pro 2 Review'
  - platform: 'youtube'
    id: 'oWZVxYF9z7I'
    title: 'AirPods Pro 2 vs Competition'
  - platform: 'tiktok'
    id: '7173589095561857323'
    title: 'Quick Tips for AirPods Pro 2'
  - platform: 'tiktok'
    id: '7173589095561857324'
    title: 'Hidden Features'
---

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

  // Get the last three digits of the year (YYY)
  //year = ('000' + (year % 1000)).slice(-3);

  // Combine into the desired format
  const formattedDate = `${day}${month}${year}`;

  // Customize these variables
  const filename = './data/' + formattedDate + "" + element.product_name.replace(/ /g, "_") + ".md";

  // Write the text to the file
  fs.writeFile(filename, text, (err) => {
    if (err) {
      console.error('An error occurred while saving the file:', err);
    } else {
      console.log(`Text successfully saved to ${filename}`);
    }
  });
 
  console.log(i + "%");
}
