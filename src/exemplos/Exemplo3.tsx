import { FC, useState, useEffect } from "react";
import { NullableArray } from "../tipos/NullableArray";
import { Pokemon } from "../tipos/Pokemon";
import PokemonManager from "../repositorio/PokemonManager";
import CardPequenoPokemon from "../componente/CardPequenoPokemon";
import { Nullable } from "../tipos/Nullable";
import CardComentario from "../componente/CardComentario";

const Exemplo3: FC = () => {
  const [listaPokemon, setListaPokemon] = useState<NullableArray<Pokemon>>();
  const [pokemonSelecionado, setPokemonSelecionado] =
    useState<Nullable<Pokemon>>();

  const buscarPokemons = async () => {
    const novaListaPokemon = await PokemonManager.obterTodosPokemon();
    setListaPokemon(novaListaPokemon);
  };

  useEffect(() => {
    buscarPokemons();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 flex items-center bg-emerald-900">
        <h1 className="p-2">Comentários</h1>
      </div>
      <div className="grow relative">
        <div className="w-full h-full flex absolute">
          <div className="w-48 h-full flex flex-col items-center overflow-y-auto">
            {listaPokemon?.map((pkm) => (
              <CardPequenoPokemon
                key={pkm.nDex}
                pokemon={pkm}
                onClick={() =>
                  setPokemonSelecionado((p) => (p !== pkm ? pkm : null))
                }
                selecionado={pkm.nDex === pokemonSelecionado?.nDex}
              />
            ))}
          </div>
          <div className="grow h-full flex items-center justify-center">
            <CardComentario
              key={pokemonSelecionado?.nDex ?? 0}
              pokemon={pokemonSelecionado}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exemplo3;
