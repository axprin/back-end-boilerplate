import HTTPStatus from 'http-status';
import axios from 'axios';

// API STUFF:
const dataRequestUrlRoot = 'https://financialmodelingprep.com/api/v3/';
// const apiKey =

const financialData = {};

export async function searchTerm(req, res) {
  const searchTermText = req.query.search;
  const endpoint = req.query.endpt;
  const url = `${dataRequestUrlRoot}${endpoint}?query=${searchTermText}&limit=20&apikey=${apiKey}`;

  await axios(url)
    .then((response) => {
      res.status(HTTPStatus.OK).json(response.data);
    })
    .catch((error) => {
      res.status(HTTPStatus.BAD_REQUEST).json(error);
    });
}

export async function getCompanyProfile(req, res) {
  const ticker = req.params.ticker;
  const url = `${dataRequestUrlRoot}profile/${ticker}?apikey=${apiKey}`;

  await axios(url)
    .then((response) => {
      res.status(HTTPStatus.OK).json(response.data);
    })
    .catch((error) => {
      res.status(HTTPStatus.BAD_REQUEST).json(error);
    });
}

export async function getCompanyPriceHistory(req, res) {
  const ticker = req.params.ticker;
  const dailyUrl = `${dataRequestUrlRoot}historical-price-full/${ticker}?apikey=${apiKey}`;
  const fiveMinUrl = `${dataRequestUrlRoot}historical-chart/5min/${ticker}?apikey=${apiKey}`;

  const getDailyHistory = axios.get(dailyUrl);
  const get5MinHistory = axios.get(fiveMinUrl);

  await axios.all([getDailyHistory, get5MinHistory])
    .then(axios.spread(function(getDailyHistoryRes, get5MinHistoryRes) {
      res.status(HTTPStatus.OK).json({daily: getDailyHistoryRes.data.historical, fiveMin: get5MinHistoryRes.data});
    })
  );
}

export async function getCompanyNews(req, res) {
  const ticker = req.params.ticker;
  const url = `${dataRequestUrlRoot}stock_news?tickers=${ticker}&limit=5&apikey=${apiKey}`;

  await axios(url)
    .then((response) => {
      res.status(HTTPStatus.OK).json(response.data);
    })
    .catch((error) => {
      res.status(HTTPStatus.BAD_REQUEST).json(error);
    });
}
