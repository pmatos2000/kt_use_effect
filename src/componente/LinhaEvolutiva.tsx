import { FC, useEffect, useState } from "react";
import { ImutavelArray } from "../tipos/ImutavelArray";
import { Pokemon } from "../tipos/Pokemon";
import CardPequenoPokemon from "./CardPequenoPokemon";
import { Nullable } from "../tipos/Nullable";

interface LinhaEvolutivaProps {
  listaPokemon: ImutavelArray<Pokemon>;
}

const LinhaEvolutiva: FC<LinhaEvolutivaProps> = ({ listaPokemon }) => {
  const [pokemonSelecionado, setPokemonSelecionado] =
    useState<Nullable<Pokemon>>();

  if (pokemonSelecionado && !listaPokemon.find((pkm) => pkm === pokemonSelecionado)) {
    setPokemonSelecionado(null);
  }

  console.log("Exemplo 4");

  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {listaPokemon.map((pkm, index, lista) => (
            <div className="flex items-center" key={pkm.nDex}>
              <CardPequenoPokemon
                
                pokemon={pkm}
                selecionado={pkm === pokemonSelecionado}
                onClick={() => setPokemonSelecionado(pkm)}
              />
              {index < lista.length - 1 && <h2>→</h2>}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {listaPokemon.map((pkm, index, lista) => (
            <div className="flex items-center" key={pkm.nDex}>
              <h1
                className={
                  pokemonSelecionado?.nDex === pkm.nDex
                    ? "text-yellow-300"
                    : "text-white"
                }
              >
                {pkm.nome}
              </h1>
              {index < lista.length - 1 && <h2>→</h2>}
            </div>
          ))}
        </div>
      </div>
      {pokemonSelecionado && (
        <img className="w-96" src={pokemonSelecionado.imagem} />
      )}
    </div>
  );
};

export default LinhaEvolutiva;
