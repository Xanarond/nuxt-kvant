import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import db from '../models/index.js';

const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
  }
  return res.status(401).send({ message: 'Unauthorized!' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (const item of roles) {
        if (item.name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      });
    });
  });
};

const isWorkerInspectionOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.division === 'Inspection' || user.role === 'admin') {
      next();
      return;
    }

    res.status(403).send({
      message: 'Require Inspection worker rules or Admin role!',
    });
  });
};

const isWorkerStorageOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.division === 'Storage' || user.role === 'admin') {
      next();
      return;
    }

    res.status(403).send({
      message: 'Require Storage worker rules or Admin role!',
    });
  });
};

const isWorkerRepairOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.division === 'Repair' || user.role === 'admin') {
      next();
      return;
    }

    res.status(403).send({
      message: 'Require Repair worker rules or Admin role!',
    });
  });
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isWorkerInspectionOrAdmin,
  isWorkerStorageOrAdmin,
  isWorkerRepairOrAdmin,
};

