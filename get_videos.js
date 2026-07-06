const https = require('https');
const options = {
  hostname: 'pixabay.com',
  path: '/api/videos/?key=34015091-6677f5f9a622416b0b2e887d4&q=artificial+intelligence&per_page=3',
  method: 'GET'
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(json.hits.map(h => h.videos.large.url).join('\n'));
    } catch(e) { console.error("Error parsing Pixabay response", data); }
  });
});
req.end();
