import Parser from './parser';
import Modela from './modela';
import Helper from './helper';

if (Helper.hasJQuery()) { 
  //++ parse page on initialization
  const parser = new Parser();
  parser.initialize();

  //++ Add Modela API to the window object
  //++ This will be use to deal with data in storage as there 
  //+* won't be direct access to data in store for manipulation
  window.$M = Modela;
}
