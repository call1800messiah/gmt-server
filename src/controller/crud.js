/* eslint-disable no-console */
import mongoose from 'mongoose';

import Person from '../model/person.server.model';
import Note from '../model/note.server.model';



export const retrieveData = (data, io) => {
  mongoose
    .model(data.className)
    .find({})
    .populate('information')
    .exec((err, dataList) => {
      console.log(`${data.className}: ${dataList}`);
      io.emit('dataRetrieved', { className: data.className, content: dataList });
    });
};

export const createData = (data, io) => {
  let newData;
  
  switch(data.className) {
    case 'person':
      newData = new Person(data.content);
      break;
    case 'note':
      newData = new Note(data.content);
    default:
      break;
  }
  
  newData.save((err, result) => {
    if (err) {
      console.log(`Error creating data: ${err}`);
    } else {
      io.emit('dataCreated', { className: result.className, content: result });
    }
  });
};

export const updateData = (data, io) => {
  mongoose.model(data.className).findOneAndUpdate(
    { _id: data.content._id },
    { data: data.content },
    { new: true },
    (err, updated) => {
      if (err) {
        console.log(`Error updating data: ${err}`);
      } else {
        io.emit('dataUpdated', { className: updated.className, content: updated });
      }
    },
  );
};

export const deleteData = (data, io) => {
  console.log(data);
  mongoose.model(data.className).deleteOne({ _id: data.content._id }, (err) => {
    if (err) {
      console.log(`Error deleting data: ${err}`);
    } else {
      io.emit('dataDeleted', { className: data.className, id: data._id });
    }
  });
};
