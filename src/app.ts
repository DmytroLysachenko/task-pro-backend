import initMdbConnection from './db/InitMdbConnection.js';
import startServer from './server.js';

const bootstrap = async () => {
  await initMdbConnection();

  startServer();
};

bootstrap();
