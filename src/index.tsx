import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import 'bulma/css/bulma.min.css';
import ReactDOM from 'react-dom';
import App from './App';

const client = new ApolloClient({
  uri: 'https://localhost:7028/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);