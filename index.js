const express = require('express');
const { ApolloClient, HttpLink } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const gql = require('graphql-tag');

const app = express();
const contractAddress='0xf99440ba4c2fc73a41c677ad8a6ddbce41e96419f372f9c7f29eb99b45bcabdb';
const httpLink = createHttpLink({
  uri: 'https://indexer.mainnet.aptoslabs.com/v1/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const variables = {
        event_account_address: {
        _eq: contractAddress,
      },
    };
app.get('/', (req, res) => {
  // Check if running on Node.js
  const html= `<html>
  <h1>Node Indexing of Aptos Blockchain</h1>
  <p><a href="/coin-activities">Coin Activities</a></p>
  <p><a href="/token-activities">Token Activities</a></p>
  <p><a href="/user-transactions">User Transactions</a></p>
  </html>`;
  res.send(html);
});
app.get('/user-transactions', (req, res) => {
  const query = gql`
    query MyQuery($event_account_address: String_comparison_exp = {}) {
      user_transactions(where: { sender: $event_account_address }limit: 10000
        order_by: {timestamp: desc}) {
        sender
        expiration_timestamp_secs
        gas_unit_price
        max_gas_amount
        timestamp
        sequence_number
        entry_function_id_str
        parent_signature_type
        epoch
        block_height
        version
      }
    }
  `;

  client
    .query({ query, variables })
    .then((response) => {
      const Data = response.data.user_transactions.map(_transaction => ({
        sender: _transaction.sender,
        timestamp: _transaction.timestamp,
        to:_transaction.entry_function_id_str,
        version: _transaction.version,
      }));
      res.json(Data);
 
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
app.get('/coin-activities', (req, res) => {
    const query = gql`
    query MyQuery( $event_account_address: String_comparison_exp = {}) {
        coin_activities(where: {event_account_address: $event_account_address}) {
          event_account_address
          entry_function_id_str
          is_gas_fee
          is_transaction_success
          transaction_timestamp
          transaction_version
          activity_type
          amount
        }
      }
      
    `;
    
    client
      .query({ query, variables })
      .then((response) => {
        const Data = response.data.coin_activities.map(_transaction => ({
          sender: _transaction.event_account_address,
          amount: _transaction.amount,
          to:_transaction.entry_function_id_str,
          timestamp:_transaction.transaction_timestamp,
          version: _transaction.transaction_version,
          successful_transaction:_transaction.is_transaction_success
        }));
        res.json(Data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  
  
  app.get('/token-activities', (req, res) => {
    const query = gql`
    query MyQuery($event_account_address: String_comparison_exp = {}) {

        token_activities(where: {event_account_address: $event_account_address}) {
          to_address
          token_amount
          token_data_id_hash
          from_address
          transaction_timestamp
          transaction_version
          transfer_type
          property_version
          name
          event_account_address
          coin_type
          coin_amount
        }
      }    `;
    
    client
      .query({ query, variables })
      .then((response) => {
        const Data = response.data.token_activities.map(_transaction => ({
          sender: _transaction.event_account_address,
          coinAmount: _transaction.coin_amount,
          tokenAmount: _transaction.token_amount,
          hash_id:_transaction.token_data_id_hash,
          to:_transaction.to_address,
          timestamp:_transaction.transaction_timestamp,
          version: _transaction.transaction_version,
          tokenName:_transaction.name,
        }));
        res.json(Data);
        // res.json(response);
      })
   
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
