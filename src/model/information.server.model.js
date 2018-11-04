import mongoose from 'mongoose';

export const informationSchema = mongoose.Schema({  
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
  creator: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user',
  },
  visible: {
    default: false,
    type: Boolean,
  },
}, {
  collection: 'information',
});

export const informationModel = mongoose.model('information', informationSchema);
