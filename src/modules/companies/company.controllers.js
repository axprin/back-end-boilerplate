import HTTPStatus from 'http-status';

import Company from './company.model';

export async function createCompany(req, res) {
  await Company.create(req.body, (err, company) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(company);
  });
}

export async function getCompanies(req, res) {
  await Company.find().exec((err, companies) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(companies);
  });
}

export async function getCompany(req, res) {
  await Company.findById(req.params.id).exec((err, company) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(company);
  });
}

export async function updateCompany(req, res) {
  await Company.findById(req.params.id).exec((err, company) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    Object.keys(req.body).forEach(key => {
      company[key] = req.body[key];
    });

    company.save((error, updatedCompany) => {
      if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

      return res.status(HTTPStatus.OK).json(updatedCompany);
    });
  });
}

export async function getCompanyBySymbol(req, res) {
  await Company.findOne({ symbol: req.params.symbol }).exec((err, company) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(company);
  });
}

export async function removeCompany(req, res) {
  await Company.findByIdAndDelete(req.params.id, (err) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.sendStatus(HTTPStatus.OK);
  });
}
