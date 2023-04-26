import { FC, useEffect, useState } from "react";
import { ImutavelArray } from "../tipos/ImutavelArray";
import { Pokemon } from "../tipos/Pokemon";
import CardPequenoPokemon from "./CardPequenoPokemon";
import { Nullable } from "../tipos/Nullable";

interface LinhaEvolutivaProps {
  listaPokemon: ImutavelArray<Pokemon>;
}

const LinhaEvolutiva: FC<LinhaEvolutivaProps> = ({ listaPokemon }) => {
  const [idPokemonSelecionado, setIdPokemonSelecionado] =
    useState<Nullable<number>>();

  const pokemonSelecionado = listaPokemon.find(
    (pkm) => pkm.nDex === idPokemonSelecionado
  );

  useEffect(() => {
    const pkm = listaPokemon.find(
      (pkm) => pkm.nDex === idPokemonSelecionado
    );

    if(!pkm) setIdPokemonSelecionado(null);
  
  }, [listaPokemon, idPokemonSelecionado]);

  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {listaPokemon.map((pkm, index, lista) => (
            <>
              <CardPequenoPokemon
                key={pkm.nDex}
                pokemon={pkm}
                selecionado={pokemonSelecionado === pkm}
                onClick={() => setIdPokemonSelecionado(pkm.nDex)}
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
      {idPokemonSelecionado && (
        <img className="w-96" src={pokemonSelecionado?.imagem} />
      )}
    </div>
  );
};

export default LinhaEvolutiva;
