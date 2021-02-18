const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { request } = require('gaxios');

const fileLocation = process.env.FILE_LOCATION
  // Add the AWS bucket URL here or set FILE_LOCATION env var to the bucket URL.
  || 'http://aws-bucket-location-here.s3-website.eu-west-2.amazonaws.com';


app.get('/*', async (req, res) => {
  const isFilePath = req.path.split('.').length > 1;
  const url = `${fileLocation}${isFilePath ? req.path : ''}`;
  const resp = await request({ url, responseType: 'stream' });
  res.set('content-type', resp.headers['content-type']);
  resp.data.pipe(res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
