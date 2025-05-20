import { render, screen, waitFor } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import PokemonResult from "../app/component/pokemon-result"
import { GET_POKEMON } from "../app/query"

//not work

jest.mock("next/navigation", () => ({
  useRouter() {
    return { push: jest.fn() }
  },
}))

// Mock data 
const bulbasaurMock = {
    request: {
      query: GET_POKEMON,
      variables: { name: "Bulbasaur" },
    },
    result: {
      data: {
        pokemon: {
          id: "UG9rZW1vbjowMDE=",
          number: "001",
          name: "Bulbasaur",
          weight: {
            minimum: "6.04kg",
            maximum: "7.76kg",
          },
          height: {
            minimum: "0.61m",
            maximum: "0.79m",
          },
          classification: "Seed Pokémon",
          types: ["Grass", "Poison"],
          resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
          weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
          fleeRate: 0.1,
          maxCP: 951,
          maxHP: 1071,
          image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
          attacks: {
            fast: [
              {
                name: "Tackle",
                type: "Normal",
                damage: 12,
              },
              {
                name: "Vine Whip",
                type: "Grass",
                damage: 7,
              },
            ],
            special: [
              {
                name: "Power Whip",
                type: "Grass",
                damage: 70,
              },
              {
                name: "Seed Bomb",
                type: "Grass",
                damage: 40,
              },
              {
                name: "Sludge Bomb",
                type: "Poison",
                damage: 55,
              },
            ],
          },
          evolutions: [
            {
              id: "UG9rZW1vbjowMDI=",
              number: "002",
              name: "Ivysaur",
              classification: "Seed Pokémon",
              types: ["Grass", "Poison"],
              image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
            },
          ],
        },
      },
    },
  }
  
  const charmanderMock = {
    request: {
      query: GET_POKEMON,
      variables: { name: "Charmander" },
    },
    result: {
      data: {
        pokemon: {
          id: "UG9rZW1vbjowMDQ=",
          number: "004",
          name: "Charmander",
          weight: {
            minimum: "7.44kg",
            maximum: "9.56kg",
          },
          height: {
            minimum: "0.53m",
            maximum: "0.67m",
          },
          classification: "Lizard Pokémon",
          types: ["Fire"],
          resistant: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
          weaknesses: ["Water", "Ground", "Rock"],
          fleeRate: 0.1,
          maxCP: 841,
          maxHP: 955,
          image: "https://img.pokemondb.net/artwork/charmander.jpg",
          attacks: {
            fast: [
              {
                name: "Ember",
                type: "Fire",
                damage: 10,
              },
              {
                name: "Scratch",
                type: "Normal",
                damage: 6,
              },
            ],
            special: [
              {
                name: "Flame Burst",
                type: "Fire",
                damage: 30,
              },
              {
                name: "Flame Charge",
                type: "Fire",
                damage: 25,
              },
              {
                name: "Flamethrower",
                type: "Fire",
                damage: 55,
              },
            ],
          },
          evolutions: [
            {
              id: "UG9rZW1vbjowMDU=",
              number: "005",
              name: "Charmeleon",
              classification: "Flame Pokémon",
              types: ["Fire"],
              image: "https://img.pokemondb.net/artwork/charmeleon.jpg",
            },
          ],
        },
      },
    },
  }
  
  const squirtleMock = {
    request: {
      query: GET_POKEMON,
      variables: { name: "Squirtle" },
    },
    result: {
      data: {
        pokemon: {
          id: "UG9rZW1vbjowMDc=",
          number: "007",
          name: "Squirtle",
          weight: {
            minimum: "7.88kg",
            maximum: "10.13kg",
          },
          height: {
            minimum: "0.44m",
            maximum: "0.56m",
          },
          classification: "Tiny Turtle Pokémon",
          types: ["Water"],
          resistant: ["Fire", "Water", "Ice", "Steel"],
          weaknesses: ["Electric", "Grass"],
          fleeRate: 0.1,
          maxCP: 891,
          maxHP: 1008,
          image: "https://img.pokemondb.net/artwork/squirtle.jpg",
          attacks: {
            fast: [
              {
                name: "Bubble",
                type: "Water",
                damage: 25,
              },
              {
                name: "Tackle",
                type: "Normal",
                damage: 12,
              },
            ],
            special: [
              {
                name: "Aqua Jet",
                type: "Water",
                damage: 25,
              },
              {
                name: "Aqua Tail",
                type: "Water",
                damage: 45,
              },
              {
                name: "Water Pulse",
                type: "Water",
                damage: 35,
              },
            ],
          },
          evolutions: [
            {
              id: "UG9rZW1vbjowMDg=",
              number: "008",
              name: "Wartortle",
              classification: "Turtle Pokémon",
              types: ["Water"],
              image: "https://img.pokemondb.net/artwork/wartortle.jpg",
            },
          ],
        },
      },
    },
  }

describe("Pokemon Type Tests", () => {
  it("should verify Bulbasaur is a Grass type", async () => {
    render(
      <MockedProvider mocks={[bulbasaurMock]} addTypename={false}>
        <PokemonResult name="Bulbasaur" />
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument()
    })

    expect(screen.getByText("Grass")).toBeInTheDocument()
  })

  it("should verify Charmander is a Fire type", async () => {
    render(
      <MockedProvider mocks={[charmanderMock]} addTypename={false}>
        <PokemonResult name="Charmander" />
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Charmander")).toBeInTheDocument()
    })

    expect(screen.getByText("Fire")).toBeInTheDocument()
  })

  it("should verify Squirtle is a Water type", async () => {
    render(
      <MockedProvider mocks={[squirtleMock]} addTypename={false}>
        <PokemonResult name="Squirtle" />
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Squirtle")).toBeInTheDocument()
    })

    expect(screen.getByText("Water")).toBeInTheDocument()
  })
})
