import HTTPStatus from 'http-status';
import nodemailer from 'nodemailer';

import Submission from './submission.model';

const enableEmail = false;

function buildSubData(key, data, html) {
  let dataString = '';

  if (html) {
    dataString += `<li><strong>${key}:</strong><ul>`;

    Object.keys(data).map(subKey => {
      if (data[subKey] === true) {
        dataString += `<li>${subKey}</li>`;
      } else {
        dataString += `<li><strong>${subKey}</strong>: ${data[subKey]}</li>`;
      }
    });

    dataString += '</ul></li>';
  } else {
    dataString += `
${key}:`;

    Object.keys(data).map(subKey => {
      if (data[subKey] === true) {
        dataString += `
  ${subKey}`;
      } else {
        dataString += `
  ${subKey}: ${data[subKey]}`;
      }
    });
  }

  return dataString;
}

function buildData(data, html) {
  let dataString = '';

  Object.keys(data).map(key => {
    if (typeof data[key] === 'object' && data[key] !== null && html) {
      // data object AND html
      dataString += buildSubData(key, data[key], true);
    } else if (typeof data[key] === 'object' && data[key] !== null && !html) {
      // data object AND plaintext
      dataString += buildSubData(key, data[key], false);
    } else if (html) {
      // single data AND html
      dataString += `<li><strong>${key}</strong>: ${data[key]}</li>`;
    } else {
      // single data AND plaintext
      dataString += `
${key}: ${data[key]}`;
    }
  });

  return dataString;
}


export async function createSubmission(req, res) {
  await Submission.create(req.body, (err, sub) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);
    // sendEmail(req.body);

    return res.status(HTTPStatus.CREATED).json(sub);
  });
}

export async function getAllSubmissions(req, res) {
  await Submission.find({}, (err, subs) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);
    return res.status(HTTPStatus.OK).json(subs);
  });
}

export async function getSubmissionsBySurvey(req, res) {
  await Submission.find({}, (err, subs) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    const filteredSubmissions = subs.filter(submission => req.params.survey === submission.survey.toString());
    return res.status(HTTPStatus.OK).json(filteredSubmissions);
  });
}

export async function deleteSubmission(req, res) {
  try {
    const submission = await Submission.findById(req.params.id);

    await submission.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

}

