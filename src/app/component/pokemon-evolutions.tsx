"use client";

import type { Pokemon } from "../types/pokemon";
import { Card } from "antd";

interface PokemonEvolutionsProps {
  evolutions: Pokemon[] | null;
  onEvolutionClick: (name: string) => void;
}

export default function PokemonEvolutions({
  evolutions,
  onEvolutionClick,
}: PokemonEvolutionsProps) {
  if (!evolutions || evolutions.length === 0) {
    return <p>This Pokemon has no evolutions.</p>;
  }

  return (
    <div className="space-y-4">
      {evolutions.map((evolution) => (
        <Card
          key={evolution.id}
          className="overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => onEvolutionClick(evolution.name)}
        >
          <div className="p-4 flex items-center">
            <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              {evolution.image && (
                <img
                  src={evolution.image || "/placeholder.svg"}
                  alt={evolution.name}
                  className="object-contain p-1"
                />
              )}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium capitalize">{evolution.name}</h3>
              <p className="text-sm text-muted-foreground">
                #{evolution.number}
              </p>
              <div className="flex gap-1 mt-1">
                {evolution.types.map((type) => (
                  <div
                    key={type}
                    className={`type-${type.toLowerCase()} text-xs`}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>
      ))}
    </div>
  );
}
