const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { request } = require('gaxios');

const fileLocation = process.env.FILE_LOCATION
  || 'http://sloth-move-static-production.s3-website.eu-west-2.amazonaws.com';


app.get('/*', (req, res) => {
  const url = `${fileLocation}${req.path}`;
  request({ url, responseType: 'text' })
    .then(resp => {
      res.set('content-type', resp.headers['content-type']);
      res.send(resp.data);
    })
    .catch(err => {});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
