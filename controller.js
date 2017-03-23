const pg = require('pg');


module.exports =
{
  getItems : function (request,reply)
              {
                const profile = 'postgress://postgres:ss@localhost:5432/todoappdb';
                var client = new pg.Client(profile);

                client.connect(connectTodb);

                function connectTodb(error)
                {
                  if(error)
                    console.log(error);

                  client.query('SELECT * FROM todolist;',afterGetQuery)
                }

                function afterGetQuery(error,result)
                {
                  if(error)
                    console.log(error);
                  reply(result.rows);
                  client.end( (error) => {if(error) throw error;});
                }
              },

  addItem : function (request,reply)
            {
              const profile = 'postgress://postgres:ss@localhost:5432/todoappdb';
              var client = new pg.Client(profile);

              client.connect(connectTodb);

              function connectTodb(error)
              {
                if(error)
                  console.log(error+' @:beforeINSERT');
                var Query = 'INSERT INTO todolist(itemid,text,done) VALUES('+request.payload.itemid+',\''+request.payload.text+'\','+request.payload.done+')';
                client.query(Query,afterPostQuery);
              }

              function afterPostQuery(error,result)
              {
                if(error)
                  console.log(error+' @:AfterINSERT');
                reply();
                client.end( (error) => {if(error) console.log(error+' @:endconnection');});
              }
            },
  updateItem : function (request,reply)
                {
                  const profile = 'postgress://postgres:ss@localhost:5432/todoappdb';
                  var client = new pg.Client(profile);

                  client.connect(connectTodb);

                  function connectTodb(error)
                  {
                    if(error)
                      console.log(error);
                    var Query = 'UPDATE todolist SET done = NOT (SELECT done FROM todolist WHERE itemid='+encodeURIComponent(request.params.id)+') WHERE itemid='+encodeURIComponent(request.params.id)+';';
                    client.query(Query,afterPutQuery);
                  }

                  function afterPutQuery(error,result)
                  {
                    if(error)
                      console.log(error);
                    reply();
                    client.end( (error) => {if(error) throw error;});
                  }
                },
  deleteItems : function (request,reply)
                {
                  const profile = 'postgress://postgres:ss@localhost:5432/todoappdb';
                  var client = new pg.Client(profile);

                  client.connect(connectTodb);

                  function connectTodb(error)
                  {
                    if(error)
                      console.log(error);
                    var Query = 'DELETE FROM todolist WHERE done = TRUE;'
                    client.query(Query,afterDeleteQuery);
                  }

                  function afterDeleteQuery(error,result)
                  {
                    if(error)
                      console.log(error);
                    reply();
                    client.end( (error) => {if(error) throw error;});
                  }
                }
}
