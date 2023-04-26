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

    useEffect(() => {
      if(!listaPokemon.find(pkm => pkm === pokemonSelecionado))
      {
        setPokemonSelecionado(null);
      }
    }, [listaPokemon, pokemonSelecionado]);
  


  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {listaPokemon.map((pkm, index, lista) => (
            <>
              <CardPequenoPokemon
                key={pkm.nDex}
                pokemon={pkm}
                selecionado={pkm === pokemonSelecionado}
                onClick={() => setPokemonSelecionado(pkm)}
              />
              {index < lista.length - 1 && <h2 key={index}>→</h2>}
            </>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {listaPokemon.map((pkm, index, lista) => (
            <>
              <h1
                className={
                  pokemonSelecionado?.nDex === pkm.nDex
                    ? "text-yellow-300"
                    : "text-white"
                }
                key={pkm.nDex}
              >
                {pkm.nome}
              </h1>
              {index < lista.length - 1 && <h2 key={index}>→</h2>}
            </>
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
