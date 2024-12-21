import 'dotenv/config'

const apiKey = process.env.OPENAI_API_KEY; // Replace with your API key
const apiUrl = 'https://api.openai.com/v1/chat/completions'; // GPT model endpoint

/**
 * Use ChatGPT as a search engine.
 * @param {string} query - The search query.
 * @returns {Promise<string>} - The ChatGPT response.
 */
async function chatgptSearch(query) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4', // Specify the GPT model you want to use
          messages: [{ role: 'user', content: query }],
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `ChatGPT API returned an error: ${errorData.error?.message || response.statusText}`
        );
      }
  
      const data = await response.json();
      console.log(data);
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error during ChatGPT search:', error.message);
      throw error;
    }
}


chatgptSearch(`tell me the price of samsung s22 ultra
right now on Amazon US and the previous price if it's on offer.
Also the rating of the 5 star.
Give a list of tags that have the product, prefer to have around 25.
Also a short description of the product.
Reply in json using this format and do not return any other else, just the json contents.
{
price: 1,
oldPrice: 2,
stars: 4.9,
tags: ["tag1", "tag2"],
description: "Description of the product in a few words"
}

If there is multiples options give me the cheapest one.`);