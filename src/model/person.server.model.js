import mongoose from 'mongoose';
import { informationSchema } from './information.server.model';

const Schema = mongoose.Schema({  
  birthdate: informationSchema,
  className: {
    default: 'person',
    type: String,
  },
  deathdate: informationSchema,
  information: [informationSchema],
  name: String,
  image: {
    default: '',
    type: String,
  },
  profession: informationSchema,
  race: informationSchema,
  visible: {
    default: false,
    type: Boolean,
  },
}, {
  collection: 'person',
});

export default mongoose.model('person', Schema);
