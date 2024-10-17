import HTTPStatus from 'http-status';
import axios from 'axios';

// POLYGON.IO API STUFF:
const dataRequestUrlRoot = 'https://api.polygon.io/vX/reference/financials';
// const polygonApiKey =

const financialData = {};

function buildRequestUrl(ticker) {
  const url = `${dataRequestUrlRoot}?ticker=${ticker}&apiKey=${polygonApiKey}`;
  return url;
}

export async function getFinancialsPolygon(req, res) {
  const ticker = req.query.ticker.toUpperCase();
  const url = buildRequestUrl(ticker);

  await axios(url)
    .then((response) => {
      financialData[ticker] = {
        timestamp: Date.now(),
        data: response.data.results,
      };
      res.status(HTTPStatus.OK).json(financialData[ticker]);
    })
    .catch((error) => {
      if (error.response.status === 429) {
        if (financialData[ticker]) {
          res.status(HTTPStatus.OK).json(financialData[ticker]);
        } else {
          res.status(HTTPStatus.OK).json({ msg: 'No data for that ticker yet, please try again in a minute' });
        }
      } else {
        res.status(HTTPStatus.BAD_REQUEST).json(error);
      }
    });
}
