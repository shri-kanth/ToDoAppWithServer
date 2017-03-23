const ctrl = require('./controller');
module.exports = {
  staticFilesRoute : {
    method : 'GET',
    path : '/{name}',
    handler :(request,reply) => {reply.file('./public/'+encodeURIComponent(request.params.name));}
  },

  getItemsRoute : {
    method : 'GET',
    path : '/items',
    handler :ctrl.getItems
  },

  addItemRoute : {
    method : 'POST',
    path : '/items',
    handler : ctrl.addItem
  },

  updateItemRoute : {
    method : 'PUT',
    path : '/items/{id}',
    handler : ctrl.updateItem
  },

  deleteItemsRoute : {
    method : 'DELETE',
    path : '/items',
    handler : ctrl.deleteItems
  }
};
