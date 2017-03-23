'use strict';
const hapi = require('hapi');
const server = new hapi.Server();
const inert = require('inert');
const routes = require('./routes')

function addRoute(error)
{
  if(error)
    console.log(error+' @:addRoute');
 server.route(routes.staticFilesRoute);
 server.route(routes.getItemsRoute);
 server.route(routes.addItemRoute);
 server.route(routes.updateItemRoute);
 server.route(routes.deleteItemsRoute);
};

function startServer(error)
{
  if(error)
    console.log(error+' @:startserver');
  console.log(`Server Running at: ${server.info.uri}`);
};

server.connection({host:'localhost',port:3000});
server.register(inert,addRoute);
server.start(startServer);
