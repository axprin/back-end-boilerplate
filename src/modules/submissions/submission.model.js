import mongoose, { Schema } from 'mongoose';

const SubmissionSchema = new Schema({
  // event: {
  //   type: String,
  //   trim: true,
  // },
  user: {
    type: Map,
    of: String,
    trim: true,
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  // recipients: [{
  //   name: {
  //     type: String,
  //     trim: true,
  //   },
  //   email: {
  //     type: String,
  //     trim: true,
  //   },
  // }],
  responses: {
    type: Schema.Types.Mixed,
    of: String,
    trim: true,
  },
},
{ timestamps: true });

SubmissionSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      // event: this.event,
      user: this.user,
      // recipients: this.recipients,
      responses: this.responses,
      survey: this.survey,
      createdAt: this.createdAt,
    };
  },
};

export default mongoose.model('Submission', SubmissionSchema);
