import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';


import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildContext } from 'graphql-passport';

import connectMongo from "connect-mongodb-session"
import session from 'express-session';
import passport from 'passport';

import mergedTypeDef from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";
import connectDb from "./db/connectDb.js";
import { configurePassport } from './passport/passport.js';
import path from 'path';

dotenv.config();
configurePassport();

const __dirname = path.resolve();

const app = express();
const httpServer = http.createServer(app);
const MongoDBSore = connectMongo(session);

const store = new MongoDBSore({
  uri:process.env.MONGODB_URI ,
  collection:"sessions",
})

store.on("error",(error)=>console.log(error));

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store:store,
  cookie:{
    maxAge:1000*60*60*24*7,
    httpOnly:true,
    
  },

}))

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
    typeDefs:mergedTypeDef,
    resolvers:mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start();
// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/graphql',
    cors({
      origin:process.env.BASE_URL,
      credentials:true,
    }),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req,res }) => buildContext({ req,res}),
    }),
  );
  
app.use(express.static(path.join(__dirname,"frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend/dist","index.html"));
})

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  await connectDb();
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);