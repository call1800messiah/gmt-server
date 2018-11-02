import mongoose from 'mongoose';

const Schema = mongoose.Schema({  
  content: String,
  created: {
    default: Date.now,
    type: Date,
  },
  className: {
    default: 'information',
    type: String,
  },
  label: String,
  use: Number,
  visible: {
    default: false,
    type: Boolean,
  },
}, {
  collection: 'information',
});

export default mongoose.model('information', Schema);
