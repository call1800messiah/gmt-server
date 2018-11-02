import mongoose from 'mongoose';

const Schema = mongoose.Schema({  
  className: {
    default: 'note',
    type: String,
  },
  information: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'information',
  }],
  name: String,
  visible: {
    default: false,
    type: Boolean,
  },
}, {
  collection: 'note',
});

export default mongoose.model('note', Schema);
