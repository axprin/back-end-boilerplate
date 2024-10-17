import HTTPStatus from 'http-status';

import Content from './content.model';

export async function createContent(req, res) {
  await Content.create(req.body, (err, content) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(content);
  });
}

export async function getContentPublic(req, res) {
  await Content.findOne({ page: req.params.page }).exec((err, content) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);
    if (!content) return res.status(HTTPStatus.NOT_FOUND).json('Not Found');

    return res.status(HTTPStatus.OK).json(content);
  });
}

export async function getContentPrivate(req, res) {
  await Content.findOne({ page: req.params.page }).populate('user').exec((err, content) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.OK).json(content);
  });
}

export async function updateContent(req, res) {
  await Content.findOne({ page: req.params.page }).exec((err, page) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    Object.keys(req.body).forEach(key => {
      page.content[key] = req.body[key];
    });

    page.markModified('content');

    page.save((error, updatedPage) => {
      if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

      return res.status(HTTPStatus.OK).json(updatedPage);
    });
  });
}
