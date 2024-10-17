import HTTPStatus from 'http-status';

import Page from './page.model';

export async function createPage(req, res) {
  await Page.create(req.body, (err, page) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.CREATED).json(page);
  });
}

export async function getPages(req, res) {
  await Page.find({}).populate('user').exec((err, pages) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.OK).json(pages);
  });
}

export async function getPage(req, res) {
  await Page.findById(req.params.id).populate('user').exec((err, page) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.OK).json(page);
  });
}

export async function getPageBySlug(req, res) {
  await Page.findOne({ slug: req.params.slug }, (err, page) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.status(HTTPStatus.OK).json(page);
  });
}

export async function updatePage(req, res) {
  await Page.findById(req.params.id, (err, page) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    Object.keys(req.body).forEach(key => {
      page[key] = req.body[key];
    });

    page.save((error, updatedPage) => {
      if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

      return res.status(HTTPStatus.OK).json(updatedPage);
    });
  });
}

