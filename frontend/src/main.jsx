import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import GridBackGround from './components/ui/GridBackGround.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackGround>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackGround>
    </BrowserRouter>
  </React.StrictMode>,
)
