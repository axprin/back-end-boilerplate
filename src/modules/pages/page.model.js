import mongoose, { Schema } from 'mongoose';
// import slug from 'slug';
// import { Buffer } from 'buffer';
// import { stringLiteral } from 'babel-types';

// TODO: FIX SLUG Auto-generate

const PageSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  templates: [{
    type: Schema.ObjectId,
    ref: 'Template',
  }],
  template: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  content: {
    type: Schema.Types.Mixed,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{ timestamps: true });

PageSchema.pre('validate', (next) => {
  // console.log('in prevalidate');
  // this.methods.slugify();

  next();
});

PageSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      slug: this.slug,
      templates: this.templates,
      template: this.template,
      isPublished: this.isPublished,
      content: this.content,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
  slugify() {
    // this.slug = slug(this.name);
    // this.slug = 'this-is-a-test';
  },
};

export default mongoose.model('Page', PageSchema);
