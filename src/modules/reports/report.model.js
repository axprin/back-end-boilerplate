import mongoose, { Schema } from 'mongoose';

const ReportSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  file: {
    type: String,
  },
  fileName: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  datePublished: {
    type: Date,
  },
  author: {
    type: String,
  },
  companyName: {
    type: String,
  },
  type: {
    type: String,
  },
  isPublished: {
    type: Boolean,
  },
},
{ timestamps: true });

ReportSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      user: this.user,
      type: this.type,
      file: this.file,
      fileName: this.fileName,
      tags: this.tags,
      datePublished: this.datePublished,
      author: this.author,
      companyName: this.companyName,
      isPublished: this.isPublished,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

export default mongoose.model('Report', ReportSchema);
