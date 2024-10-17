import mongoose, { Schema } from 'mongoose';

const FavoriteSchema = new Schema({
  favorites: [mongoose.Schema.Types.Mixed],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{ timestamps: true });

FavoriteSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      favorites: this.favorites,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

export default mongoose.model('Favorite', FavoriteSchema);
