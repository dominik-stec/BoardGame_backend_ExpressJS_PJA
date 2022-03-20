var express = require('express');
var app = express();
var models = require('express-cassandra');
 
// Tell express-cassandra to use the models-directory, and
// use bind() to load the models using cassandra configurations.
models.setDirectory( __dirname + '/models').bind(
   {
       clientOptions: {
           contactPoints: ['127.0.0.1'],
           protocolOptions: { port: 9042 },
           keyspace: 'test_ks',
           queryOptions: {consistency: models.consistencies.one}
       },
       ormOptions: {
           defaultReplicationStrategy : {
               class: 'SimpleStrategy',
               replication_factor: 1
           },
           migration: 'safe'
       }
   },
   function(err) {
       if(err) throw err;
   }
);