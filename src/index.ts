import { SetupServer } from './server';

const startApp = async () => {
  const server = new SetupServer();
  await server.init();
  server.start();
};
startApp();
