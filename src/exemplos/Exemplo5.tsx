import { FC, useEffect, useState } from "react";
import Card from "../componente/Card";
import EntradaTexto from "../componente/EntradaTexto";
import { Pokemon } from "../tipos/Pokemon";
import { NullableArray } from "../tipos/NullableArray";
import PokemonManager from "../repositorio/PokemonManager";
import CardPequenoPokemon from "../componente/CardPequenoPokemon";

const Exemplo5: FC = () => {
  const [pesquisa, setPesquisa] = useState<string>("");
  const [listaPokemon, setListaPokemon] = useState<NullableArray<Pokemon>>();

  useEffect(() => {
    const buscarPokemons = async () => {
      if(pesquisa)
      {
        const novaListaPokemon = await PokemonManager.obterPokemon(pesquisa);
        setListaPokemon(novaListaPokemon);
      }
    };
    buscarPokemons();
  }, [pesquisa]);


  return (
    <div className="w-screen h-screen flex flex-col items-center	">
      <div className="h-20">
        <Card largura="144">
          <div className="flex justify-center">
            <EntradaTexto
              valor={pesquisa}
              onChange={(novoValor) => setPesquisa(novoValor)}
            />
          </div>
        </Card>
      </div>
      <div className="w-144 grow overflow-y-auto grid grid-cols-3 justify-items-center content-start">
        {Boolean(pesquisa) && listaPokemon?.length ? listaPokemon?.map((pkm) => (
          <CardPequenoPokemon key={pkm.nDex} pokemon={pkm} />
        )) : "Nénhum pokémon"}
      </div>
    </div>
  );
};

export default Exemplo5;
