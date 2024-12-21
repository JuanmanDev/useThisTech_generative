import 'dotenv/config';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import fs, { readFileSync } from 'fs';
import google from 'googlethis';
import YouTube from 'simple-youtube-api';
import { exit } from 'process';

// Read JSON data from file
const json = readFileSync('./data/source/2024_prices.json');
const data = JSON.parse(json);
console.log(data);

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

(async () => {
  const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    // Fetch YouTube videos
    const videos = await youtube.searchVideos(element.product_name, 10, {
        // location: '40.730610, -73.935242',
        // locationRadius: '10000m'
        regionCode: 'US'
    });

    // Fetch Google images using Promise.all
    const allResults = await Promise.all([
      google.image(`official images ${element.product_name}`, { query: { safe: true } }),
      google.image(`${element.product_name} with people`, { query: { safe: true } }),
      google.image(`${element.product_name} landing`, { query: { safe: true } }),
      google.image(`${element.product_name} wall`, { query: { safe: true } }),
    ]);

    const images = allResults
      .map(results => results.slice(0, 20))
      .flat()
      .map(result => result.url);

    shuffleArray(images);

    // Generate descriptions and blog post
    const { text: description } = await generateText({
      model: openai('gpt-4o'),
      prompt: `Tell a short description of ${element.product_name}.`,
    });

    const { price, oldPrice, stars } = element;

    const { text: blogPost } = await generateText({
      model: openai('gpt-4o'),
      prompt: `Generate a blog post about the ${element.product_name} in the ${element.category} category to sell it.
      Use markdown to format the post.

      Add emojis to make the post more engaging.

      Add a summary at the end indicating if it's a good product to buy, and if it's on sale, emphasize not missing the price.`,
    });

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${today.getFullYear()}`;

    const frontMatter = `---
title: ${element.product_name}
description: ${description}
price: ${price}
oldPrice: ${oldPrice}
createdAt: '${today.toISOString().split('T')[0]}'
rating: ${stars}

images: [
  ${images.map(image => `'${image}'`).join(', ')}
]
videos: 
${videos
  .map(
    video => `  - platform: 'youtube'
    id: '${video.id}'
    title: '${video.title}'`
  )
  .join('\n')}
---`;

    const outputContent = `${frontMatter}\n\n${blogPost}`;

    const dir = './data/generated/';
    const filename = `${dir}${formattedDate}_${element.product_name.replace(/ /g, '_')}.md`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filename, outputContent);
    console.log(`File saved: ${filename}`);

    exit();
  }
})();
