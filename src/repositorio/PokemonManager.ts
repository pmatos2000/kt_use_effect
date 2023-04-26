import PokemonRepositorio from "./PokemonRepositorio";

export default class PokemonManager {
  static obterTodosPokemon = async () => {
    const resultado = await PokemonRepositorio.obterTodosPokemon({
      tempoEspera: 2000,
    });
    return resultado instanceof Error ? null : resultado;
  };

  
  static obterPokemon = async (termo: string) => {
    const resultado = await PokemonRepositorio.obterPokemon(termo, {
      tempoEspera: 100,
    });
    return resultado instanceof Error ? null : resultado;
  };
}
