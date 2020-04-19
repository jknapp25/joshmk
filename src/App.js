import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home.js";
export default App;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const token = "ef708f108761b6a739564d6b8a296ff0ca2f25ac";
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Home />
      </div>
    </ApolloProvider>
  );
}
