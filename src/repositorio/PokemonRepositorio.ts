import { listaPokemon } from "../compartilhado/util/Constantes";
import { Pokemon } from "../tipos/Pokemon";

interface IConfiguracao {
  tempoEspera?: number;
  probabilidadeErro?: number;
}

const Api = {
  getObterTodosPokemon: (tempoEspera: number, probabilidadeErro: number) =>
    new Promise<Pokemon[]>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > probabilidadeErro) {
          resolve([...listaPokemon]);
        } else {
          reject(
            new Error("Erro ao executar a API de obter todos os Pokémons")
          );
        }
      }, tempoEspera);
    }),
};

export default class PokemonRepositorio {
  static obterTodosPokemon = async (configuracao?: IConfiguracao) => {
    const tempoEspera = configuracao?.tempoEspera ?? 100;
    const probabilidadeErro = configuracao?.probabilidadeErro ?? 0;
    return Api.getObterTodosPokemon(tempoEspera, probabilidadeErro)
      .then((p) => p)
      .catch((error: Error) => {
        console.log(error.message);
        return error;
      });
  };

  static obterPokemon = async (termo: string, configuracao?: IConfiguracao) => {
    const tempoEspera = configuracao?.tempoEspera ?? 100;
    const probabilidadeErro = configuracao?.probabilidadeErro ?? 0;
    return Api.getObterTodosPokemon(tempoEspera, probabilidadeErro)
      .then((p) => p.filter(
        (pkm) => pkm.nome.toLowerCase().indexOf(termo.toLowerCase()) !== -1
      ))
      .catch((error: Error) => {
        console.log(error.message);
        return error;
      });
  };
}
