import dotenv from 'dotenv';
import sequelize from './models/index.js';
import { valid_obj } from './queries/validation.js'; 
import pkg from 'bcryptjs';
const { hashSync } = pkg;
import express from 'express'; // Import Express
import routes from './routes/main.routes.js'; // Import your routes
import cors from 'cors';
import db from './models/index.js';

dotenv.config();

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions)); // Use CORS middleware
// Use your routes
routes(app);

db.Role = db.role
db.User = db.user

function initial() {
  Role.bulkCreate([
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'worker'
    }
  ]).then(
    User.create({
      username: 'admin',
      division: '',
      password: hashSync('123', 8),
      role: 'admin'
    }).then((user) => {
      Role.findOne({
        where: {
          name: 'admin'
        }
      }).then((roles) => {
        user.setRoles(roles);
      });
    })
  );

  User.create({
    username: 'stock',
    division: 'Storage',
    password: hashSync('123', 8),
    role: 'worker'
  }).then((user) => {
    Role.findOne({
      where: {
        name: 'worker'
      }
    }).then((roles) => {
      user.setRoles(roles);
    });
  });

  User.create({
    username: 'insp',
    division: 'Inspection',
    password: hashSync('123', 8),
    role: 'worker'
  }).then((user) => {
    Role.findOne({
      where: {
        name: 'worker'
      }
    }).then((roles) => {
      user.setRoles(roles);
    });
  });

  User.create({
    username: 'repa',
    division: 'Repair',
    password: hashSync('123', 8),
    role: 'worker'
  }).then((user) => {
    Role.findOne({
      where: {
        name: 'worker'
      }
    }).then((roles) => {
      user.setRoles(roles);
    });
  });

  sequelize.query(valid_obj.inspection);
  sequelize.query(valid_obj.storage);
  sequelize.query(valid_obj.repair);
}

// Create a Server
const server = app.listen(process.env.SERVER_PORT, () => {
  const { address: host, port } = server.address();
  console.log('App listening at http://%s:%s', host, port);
});
