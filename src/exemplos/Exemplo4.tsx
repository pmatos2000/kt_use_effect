import { FC, useState, useEffect } from "react";
import { NullableArray } from "../tipos/NullableArray";
import { Pokemon } from "../tipos/Pokemon";
import PokemonManager from "../repositorio/PokemonManager";
import CardPequenoPokemon from "../componente/CardPequenoPokemon";
import { Nullable } from "../tipos/Nullable";
import LinhaEvolutiva from "../componente/LinhaEvolutiva";

const obterListaPokemonEvolucaoAnterior = (
  pokemon: Readonly<Pokemon>,
  listaPokemon: NullableArray<Pokemon>
): Array<Pokemon> => {
  const evolucaoAnterior = listaPokemon?.find((pkm) =>
    pkm.evoluirPara?.includes(pokemon.nome)
  );
  return evolucaoAnterior
    ? [
        { ...evolucaoAnterior },
        ...obterListaPokemonEvolucaoAnterior(evolucaoAnterior, listaPokemon),
      ]
    : [];
};

const obterListaPokemonEvolucaoSuperior = (
  pokemon: Readonly<Pokemon>,
  listaPokemon: NullableArray<Pokemon>
): Array<Pokemon> => {
  const proximaEvolucao = pokemon.evoluirPara?.length
    ? listaPokemon?.find((pkm) => pokemon.evoluirPara?.includes(pkm.nome))
    : null;

  return proximaEvolucao
    ? [
        { ...proximaEvolucao },
        ...obterListaPokemonEvolucaoSuperior(proximaEvolucao, listaPokemon),
      ]
    : [];
};

const obterListaPokemonEvolucao = (
  pokemon: Nullable<Pokemon>,
  listaPokemon: NullableArray<Pokemon>
) => {
  return (pokemon && listaPokemon)
    ? [
        ...obterListaPokemonEvolucaoAnterior(pokemon, listaPokemon),
        { ...pokemon },
        ...obterListaPokemonEvolucaoSuperior(pokemon, listaPokemon),
      ]
    : [];
};

const Exemplo4: FC = () => {
  const [listaPokemon, setListaPokemon] = useState<NullableArray<Pokemon>>();
  const [pokemonSelecionado, setPokemonSelecionado] =
    useState<Nullable<Pokemon>>();

  const buscarPokemons = async () => {
    const novaListaPokemon = await PokemonManager.obterTodosPokemon();
    setListaPokemon(novaListaPokemon);
  };

  const linhaEvolutiva = obterListaPokemonEvolucao(pokemonSelecionado, listaPokemon).sort((a,b) => a.nDex - b.nDex);
  console.log(linhaEvolutiva);

  useEffect(() => {
    buscarPokemons();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 flex items-center bg-emerald-900">
        <h1 className="p-2">Linha evolutiva</h1>
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
          <div className="h-full flex items-center justify-center">
            <LinhaEvolutiva listaPokemon={linhaEvolutiva} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exemplo4;
