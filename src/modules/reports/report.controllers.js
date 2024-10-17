import HTTPStatus from 'http-status';

import Report from './report.model';

export async function createReport(req, res) {
  await Report.create(req.body, (err, content) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(content);
  });
}

export async function getReports(req, res) {
  await Report.find({}).populate('user').exec((err, reports) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(reports);
  });
}

export async function getReportsClient(req, res) {
  await Report.find({}).populate('user').exec((err, reports) => {
    // filter reports to only return reports where isPublished === true and datePublished is in the past
    const clientReports = reports.filter(report => report.isPublished && (report.datePublished < new Date()));
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(clientReports);
  });
}

export async function getReportsByCompany(req, res) {
  await Report.find({ companyName: req.query.name }).populate('user').exec((err, reports) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(reports);
  });
}

export async function getReport(req, res) {
  await Report.findById(req.params.id).populate('user').exec((err, reports) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(reports);
  });
}

export async function updateReport(req, res) {
  await Report.findById(req.params.id).exec((err, report) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    Object.keys(req.body).forEach(key => {
      report[key] = req.body[key];
    });

    report.save((error, updatedReport) => {
      if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

      return res.status(HTTPStatus.OK).json(updatedReport);
    });
  });
}

export async function removeReport(req, res) {
  await Report.findByIdAndDelete(req.params.id, (err) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.sendStatus(HTTPStatus.OK);
  });
}

