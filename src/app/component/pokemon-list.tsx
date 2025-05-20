import { gql, useQuery } from "@apollo/client";
import { Card, List } from "antd";
const GET_POKEMON = gql(/* GraphQL */ `
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`);
export function PokemonList() {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { first: 901 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;

  return (
    <List
      grid={{ gutter: 18, column: 3 }}
      dataSource={data.pokemons}
      renderItem={(pokemon: any) => (
        <List.Item>
          <Card
            title={pokemon.name}
            style={{ width: 200, height: 300 }}
            key={pokemon.id}
            hoverable
            className="overflow-hidden block"
            cover={
              <div className="h-20 bg-gray-50 flex self-center justify-items-center overflow-hidden">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="object-contain"
                  width={100}
                  height={100}
                ></img>
              </div>
            }
          >
            <div>
              <div className="relative aspect-square overflow-hidden">
                <div>name {pokemon.name}</div>
                <div>maxHP {pokemon.maxHP}</div>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
