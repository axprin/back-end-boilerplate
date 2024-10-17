import HTTPStatus from 'http-status';
import Favorite from './favorite.model.js';

export async function getFavorites(req, res) {
  await Favorite.findOne({ user: req.user._id }, (error, favorite) => {
    if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

    // If there is a favorite found for the user, return document:
    if (favorite) return res.status(HTTPStatus.OK).json(favorite);

    // If no favorite found, create one for the user and return document:
    Favorite.create({ user: req.user._id }, (err, newFavorite) => {
      if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);
      // saved!
      return res.status(HTTPStatus.OK).json(newFavorite);
    });
  });
}

export async function setFavorites(req, res) {
  console.log('running setFavorites!', req.body);

  await Favorite.findOne({ user: req.user._id }, (error, favorite) => {
    if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

    favorite.favorites = req.body;

    favorite.save((err, updatedFavorite) => {
      if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

      return res.status(HTTPStatus.OK).json(updatedFavorite);
    });
  });
}
