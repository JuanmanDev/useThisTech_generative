// const google = require('googlethis');
import google from 'googlethis';

// Image Search
const images = await google.image('The Wolf Among Us', { safe: false });
console.log(images); 
