import express from "express";
import { router } from "./router";
import path from "path";

const app = express();

export class App{
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
    
  }

  private middleware(){
    this.server.use(express.json());
    this.server.use(express.static(path.join(__dirname, 'public')))
  }

  private router(){
    this.server.use(router);
  }
}