var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var scrypt = require('scrypt');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var db=require('./db')(mongoose);
var app=require('./init')(express,bodyParser,session,FileStore);
var routes=require('./routes')(app,scrypt);

