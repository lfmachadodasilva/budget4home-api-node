import './util/module-alias';
import * as http from 'http';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import { json } from 'body-parser';
import { ForecastController } from './controllers/forecast';

export class SetupServer extends Server {
  private server?: http.Server;

  /*
   * same as this.port = port, declaring as private here will
   * add the port variable to the SetupServer instance
   */
  constructor(private port = 5000) {
    super();
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    this.addControllers([forecastController]);
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
}
