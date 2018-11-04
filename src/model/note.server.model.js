import mongoose from 'mongoose';
import { informationSchema } from './information.server.model';

const Schema = mongoose.Schema({  
  className: {
    default: 'note',
    type: String,
  },
  information: [informationSchema],
  name: String,
  visible: {
    default: false,
    type: Boolean,
  },
}, {
  collection: 'note',
});

export default mongoose.model('note', Schema);
