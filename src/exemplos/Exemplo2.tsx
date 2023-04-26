import { FC, useEffect, useState } from "react";
import { NullableArray } from "../tipos/NullableArray";
import { Pokemon } from "../tipos/Pokemon";
import Card from "../componente/Card";
import CardPequenoPokemon from "../componente/CardPequenoPokemon";
import PokemonManager from "../repositorio/PokemonManager";
import GraficoPokemon from "../componente/GraficoPokemon";
import { TfiReload } from "react-icons/tfi";

const Exemplo2: FC = () => {
  const [listaPokemon, setListaPokemon] = useState<NullableArray<Pokemon>>();

  const buscarPokemons = async () => {
    const novaListaPokemon = await PokemonManager.obterTodosPokemon();
    setListaPokemon(novaListaPokemon);
  };

  useEffect(() => {
    buscarPokemons();
  }, []);

  console.log("Exemplo2");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 flex items-center	px-2 bg-emerald-900">
        <h1 className="w-11/12">Estatística dos Pokémons</h1>
        <div className="w-1/12">
          <TfiReload
            className="
              cursor-pointer
              ml-auto
              mr-1
              fill-emerald-500 
              hover:fill-emerald-400
              hover:animate-rotacao"
            size={24}
            onClick={() => buscarPokemons()}
          />
        </div>
      </div>
      <div className="w-full flex grow">
        <div className="self-center">
          <Card largura="128" altura="128">
            {listaPokemon?.length ? (
              <GraficoPokemon listaPokemon={listaPokemon} />
            ) : (
              "Nenhum Pokémon..."
            )}
          </Card>
        </div>
        <div className="relative grow">
          <div className="h-full absolute overflow-y-auto flex flex-wrap justify-items-center content-start">
            {listaPokemon?.map((pkm) => (
              <CardPequenoPokemon
                key={pkm.nDex}
                pokemon={pkm}
                emExclusaoCard={(nDex) =>
                  setListaPokemon(
                    listaPokemon?.filter((pkm) => pkm.nDex !== nDex)
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exemplo2;
