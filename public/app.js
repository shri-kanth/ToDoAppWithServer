angular.module('todoApp', [])
.controller('TodoListController',toDoList);

toDoList.$inject =['$http'];

function toDoList($http)
{
  var todoList = this;
  todoList.todoItems = [];
  $http({
          method : "GET",
          url :  "http://localhost:3000/items"
        }).then(function sucess(response){
                                          todoList.todoItems = response.data;
                },function error(response){console.log("error in fetching Data");});

  todoList.addTodo = function()
  {
    var currentId = todoList.getId();
    todoList.todoItems.push({text:todoList.todoText, done:false, itemid:currentId});
    $http({
            method : "POST",
            url :  "http://localhost:3000/items",
            data : {"text":todoList.todoText, "done":false, "itemid":currentId}
          }).then(function sucess(response){
                                              console.log("POST Sucess");
                  },function error(response){console.log("error in Adding Item");});
    todoList.todoText = '';
  };

  todoList.completed = function()
  {
    var count = 0;
    angular.forEach(todoList.todoItems,
                    function(todo)
                    {
                      count += todo.done ? 1 : 0;
                    });
    return count;
  };

  todoList.clearFinisihed = function()
  {
    var oldList = todoList.todoItems;
    todoList.todoItems = [];
    for(var i = 0; i < oldList.length; i++)
    {
      if(oldList[i].done === false)
        todoList.todoItems.push(oldList[i]);
    }
    todoList.deleteServerItems();
  };
  todoList.deleteServerItems = function()
  { var str = "http://localhost:3000/items";
    $http({
            method : "DELETE",
            url :  str,
          }).then(function sucess(response){
                                              console.log("DELETE Sucess");
                  },function error(response){console.log("error in Deleting Items");});
  };
  todoList.updateServerItem = function(index)
  {
    var str = "http://localhost:3000/items/"+index;
    $http({
            method : "PUT",
            url :  str,
          }).then(function sucess(response){
                                              console.log("PUT Sucess");
                  },function error(response){console.log("error in Updating Items");});

  }

  todoList.getId = function()
  {
    if(todoList.todoItems.length === 0)
      this.id = 0;
    else
      this.id++;

      return this.id;

  }
};
