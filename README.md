
# Aptos Blockchain Indexing

## Description

This project provides an API to retrieve data from the Aptos Blockchain. It allows users to access coin activities, token activities, and user transactions. The API utilizes the Aptos Labs Indexer to fetch the data and returns it in a JSON format.

## Configuration

No additional configuration is required for this project.

## API Routes

### Root

- Route: `/`
- Description: Displays the main page with links to different data endpoints.
- Method: GET
- Response: HTML

### User Transactions

- Route: `/user-transactions`
- Description: Retrieves user transactions based on the specified contract address.
- Method: GET
- Response: JSON
- Query Parameters:
  - `contractAddress`: The contract address used for filtering the transactions.

### Coin Activities

- Route: `/coin-activities`
- Description: Retrieves coin activities based on the specified contract address.
- Method: GET
- Response: JSON
- Query Parameters:
  - `contractAddress`: The contract address used for filtering the activities.

### Token Activities

- Route: `/token-activities`
- Description: Retrieves token activities based on the specified contract address.
- Method: GET
- Response: JSON
- Query Parameters:
  - `contractAddress`: The contract address used for filtering the activities.

## Setup and Running

1. Clone the repository:

```shell
git clone https://github.com/sscodez/Aptos_Node_Indexing
```

2. Install the required dependencies:

```shell
npm install
```

3. Start the server:

```shell
npm start
```

4. Access the API endpoints using the provided routes.

## Contributing

Contributions are welcome! If you find any issues or would like to enhance the project, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Aptos Labs](https://www.aptoslabs.com/) for providing the blockchain indexing service.
- [Express](https://expressjs.com/) for the web application framework.
- [Apollo Client](https://www.apollographql.com/docs/react/) for interacting with the GraphQL API.
- [GraphQL](https://graphql.org/) for querying the Aptos Blockchain data.
