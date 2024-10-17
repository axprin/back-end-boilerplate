import mongoose, { Schema } from 'mongoose';

const CompanySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  symbol: {
    type: String,
    trim: true,
  },
  ideaStatus: {
    type: String,
    default: 'Open',
  },
  openDate: {
    type: Date,
    default: null,
  },
  closedDate: {
    type: Date,
    default: null,
  },
  watchlistDate: {
    type: Date,
    default: null,
  },
  rejectDate: {
    type: Date,
    default: null,
  },
  stockExchange: {
    type: String,
  },
  currency: {
    type: String,
  },
  exchangeShortName: {
    type: String,
  },
  reports: [{
    type: Schema.ObjectId,
    ref: 'Report',
  }],
},
{ timestamps: true });

CompanySchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      symbol: this.symbol,
      ideaStatus: this.ideaStatus,
      reports: this.reports,
      stockExchange: this.stockExchange,
      exchangeShortName: this.exchangeShortName,
      openDate: this.openDate,
      closedDate: this.closedDate,
      watchlistDate: this.watchlistDate,
      rejectDate: this.rejectDate,
      currency: this.currency,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

export default mongoose.model('Company', CompanySchema);
