import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/webpack.config';

const port = 4000;
const app = express();
const compiler = webpack(config);

// serve static files from public folder
app.use(express.static('public'));

// enable express to serve webpack output
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// enable hot module replacement of served react app
app.use(webpackHotMiddleware(compiler));

// render index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, (error) => {
  if (error) throw error;
});
