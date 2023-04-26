import { FC, useEffect, useState } from "react";
import Card from "../componente/Card";
import EntradaTexto from "../componente/EntradaTexto";
import { Pokemon } from "../tipos/Pokemon";
import { NullableArray } from "../tipos/NullableArray";
import PokemonManager from "../repositorio/PokemonManager";
import CardPequenoPokemon from "../componente/CardPequenoPokemon";

const Exemplo1: FC = () => {
  const [pesquisa, setPesquisa] = useState<string>("");
  const [listaPokemon, setListaPokemon] = useState<NullableArray<Pokemon>>();

  const listaPokemonFiltrada = listaPokemon?.filter(
    (pkm) => pkm.nome.toLowerCase().indexOf(pesquisa.toLowerCase()) !== -1
  );

  /*
  const [listaPokemonFiltrada, setListaPokemonFiltrada] =
    useState<NullableArray<Pokemon>>();
    */

  useEffect(() => {
    const buscarPokemons = async () => {
      const novaListaPokemon = await PokemonManager.obterTodosPokemon();
      setListaPokemon(novaListaPokemon);
    };
    buscarPokemons();
  }, []);

  /*
  useEffect(() => {
    const novaListaPokemonFiltrada = listaPokemon?.filter(
      (pkm) => pkm.nome.toLowerCase().indexOf(pesquisa.toLowerCase()) !== -1
    );
    setListaPokemonFiltrada(novaListaPokemonFiltrada);
  }, [pesquisa, listaPokemon]); */

  console.log("Fui chamado!!!");

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
        {listaPokemonFiltrada?.map((pkm) => (
          <CardPequenoPokemon key={pkm.nDex} pokemon={pkm} />
        ))}
      </div>
    </div>
  );
};

export default Exemplo1;
