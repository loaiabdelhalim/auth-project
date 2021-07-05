import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {store} from "./store/index";

import App from './App';
import reportWebVitals from './reportWebVitals';


const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
});

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
