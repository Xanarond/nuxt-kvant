import db from '../models/index.js';

const { total: Total, inspection: Inspection, repair: Repair, storage: Storage, archive: Archive } = db;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mainTable = (req, res) => {
  Total.findAll().then((data) => {
    res.send(data);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const inspectionTable = (req, res) => {
  Inspection.findAll().then((data) => {
    res.send(data);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const repairTable = (req, res) => {
  Repair.findAll().then((data) => {
    res.send(data);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const storageTable = (req, res) => {
  Storage.findAll().then((data) => {
    res.send(data);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const archiveTable = (req, res) => {
  Archive.findAll().then((data) => {
    res.send(data);
  });
};
