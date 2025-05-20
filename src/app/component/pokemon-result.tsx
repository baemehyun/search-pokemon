"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_POKEMON } from "../query";
import { Pokemon } from "../types/pokemon";
import { useMemo } from "react";
import { Card } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import PokemonAttacks from "./pokemon-attacks";
import PokemonEvolutions from "./pokemon-evolutions";
interface PokemonResultProps {
  name: string;
}

export default function PokemonResult({ name }: PokemonResultProps) {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
    fetchPolicy: "cache-first",
  });

  const pokemon: Pokemon | null = useMemo(() => {
    return data?.pokemon || null;
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;
  if (!pokemon) {
    return (
      <Card>
        <p>no pokemon</p>
      </Card>
    );
  }
  const gridStyle: React.CSSProperties = {
    width: "50%",
    textAlign: "center",
  };

  const handleEvolutionClick = (evolutionName: string) => {
    router.push(`/?name=${evolutionName.toLowerCase()}`);
  };
  if (pokemon) {
    return (
      <div title={pokemon.name} style={{ width: 500, height: 500 }}>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          <div className="flex flex-col items-center">
            {pokemon.image && (
              <div className="relative w-[200px] h-[200px] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={pokemon.image || "/placeholder.svg"}
                  alt={pokemon.name}
                  width={200}
                  className="object-contain p-4"
                />
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-4 w-full">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">
                  {pokemon.weight?.minimum} - {pokemon.weight?.maximum}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-medium">
                  {pokemon.height?.minimum} - {pokemon.height?.maximum}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-2">
              <div className="mt-4">
                <h1 className="font-medium capitalize">Attacks</h1>
                <PokemonAttacks attacks={pokemon.attacks} />
              </div>
              <div className="mt-4">
                <h1 className="font-medium capitalize">Evolutions</h1>
                <PokemonEvolutions
                  evolutions={pokemon.evolutions}
                  onEvolutionClick={handleEvolutionClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
