import { FC, useState, useEffect, useRef } from "react";
import { NullableArray } from "../tipos/NullableArray";
import { Pokemon } from "../tipos/Pokemon";
import PokemonManager from "../repositorio/PokemonManager";
import CardPequenoPokemon from "../componente/CardPequenoPokemon";
import { ImutavelArray } from "../tipos/ImutavelArray";

const Exemplo6: FC = () => {
  const [listaPokemon, setListaPokemon] = useState<NullableArray<Pokemon>>();

  const [listaPokemonFavorita, setListaPokemonFavorita] = useState<
    ImutavelArray<Pokemon>
  >([]);

  const listaPokemonFavoritaAntiga = useRef<ImutavelArray<Pokemon>>([]);

  const buscarPokemons = async () => {
    const novaListaPokemon = await PokemonManager.obterTodosPokemon();
    setListaPokemon(novaListaPokemon);
  };

  useEffect(() => {
    buscarPokemons();
  }, []);

  useEffect(() => {
    if (
      listaPokemonFavorita.length > listaPokemonFavoritaAntiga.current.length
    ) {
      const pokemonNovo = listaPokemonFavorita.find(
        (pkm) => !listaPokemonFavoritaAntiga.current.includes(pkm)
      );
      if (pokemonNovo) {
        console.log(`${pokemonNovo.nome} adicionado aos favoritos`);
      }
    }
    else
    {
      const pokemonRemovido = listaPokemonFavoritaAntiga.current.find(
        (pkm) => !listaPokemonFavorita.includes(pkm)
      );
      if (pokemonRemovido) {
        console.log(`${pokemonRemovido.nome} removido dos favoritos`);
      }
    }
  }, [listaPokemonFavorita]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 flex items-center bg-emerald-900">
        <h1 className="p-2">Favoritos</h1>
      </div>
      <div className="grow relative">
        <div className="w-full h-full flex absolute">
          <div className="w-144 h-full flex flex-wrap items-center overflow-y-auto">
            {listaPokemon?.map((pkm) => (
              <CardPequenoPokemon
                key={pkm.nDex}
                pokemon={pkm}
                onClick={() => {
                  if (!listaPokemonFavorita.find((p) => p === pkm)) {
                    listaPokemonFavoritaAntiga.current = listaPokemonFavorita;
                    setListaPokemonFavorita([...listaPokemonFavorita, pkm]);
                  }
                }}
              />
            ))}
          </div>
          <div className="w-144 h-full flex  flex-wrap items-center">
            {listaPokemonFavorita?.map((pkm) => (
              <CardPequenoPokemon
                key={pkm.nDex}
                pokemon={pkm}
                onClick={() => {
                  listaPokemonFavoritaAntiga.current = listaPokemonFavorita;
                  setListaPokemonFavorita(
                    listaPokemonFavorita.filter((p) => p !== pkm)
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exemplo6;
