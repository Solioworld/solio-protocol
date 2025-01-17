# Examples

Some plain and simple examples

## Query `FactoryProxy` contract address

- [Try Online](https://api.studio.thegraph.com/query/93762/bonding-sepolia/version/latest/graphql?query=query+QueryFactoryProxyAddress+%7B%0A++platformEntities+%7B%0A++++addr%0A++%7D%0A%7D)

```graphql copy
query QueryFactoryProxyAddress {
  platformEntities {
    addr
  }
}
```

## Query number of launch tokens

- [Try Online](https://api.studio.thegraph.com/query/93762/bonding-sepolia/version/latest/graphql?query=query+QueryLaunchCount+%7B%0A++counterEntities%28where%3A+%7Btype_contains%3A+%22DaoCount%22%7D%29+%7B%0A++++count%0A++%7D%0A%7D)

```graphql copy
query QueryLaunchCount {
  counterEntities(where: {type_contains: "DaoCount"}) {
    count
  }
}
```

## Query multiple entities at once

- [Try Online](https://api.studio.thegraph.com/query/93762/bonding-sepolia/version/latest/graphql?query=query+QueryPlatformInfo+%7B%0A++platformEntities+%7B%0A++++addr%0A++%7D%0A++counterEntities%28where%3A+%7Btype_contains%3A+%22DaoCount%22%7D%29+%7B%0A++++count%0A++%7D%0A%7D)

```graphql copy
query QueryPlatformInfo {
  platformEntities {
    addr
  }
  counterEntities(where: {type_contains: "DaoCount"}) {
    count
  }
}
```
