import mongoose from 'mongoose';

const Schema = mongoose.Schema({  
  birthdate: String,
  className: {
    default: 'person',
    type: String,
  },
  deathdate: String,
  name: String,
  image: {
    default: '',
    type: String,
  },
  profession: String,
  race: String,
  visible: {
    default: false,
    type: Boolean,
  },
}, {
  collection: 'person',
});

export default mongoose.model('person', Schema);
