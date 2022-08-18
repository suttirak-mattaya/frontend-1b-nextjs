import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:8055/graphql',
  cache: new InMemoryCache(),
})

export default function ProviderApollo(props: {
  children: ReactNode | ReactNode[]
}) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
