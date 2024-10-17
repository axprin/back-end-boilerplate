import mongoose, { Schema } from 'mongoose';

const ContentSchema = new Schema({
  page: {
    type: String,
    trim: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: Schema.Types.Mixed,
  },
},
{ timestamps: true });

ContentSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      page: this.page,
      user: this.user,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

export default mongoose.model('Content', ContentSchema);
