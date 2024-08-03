import Column from '../db/models/Column';

interface IFilter {}

interface IBody {}

const updateContact = (filter: IFilter, body: IBody) =>
  Column.findOneAndUpdate(filter, body);
