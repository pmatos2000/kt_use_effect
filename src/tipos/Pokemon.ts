import { TipoPokemon } from "./TipoPokemon";

export interface Pokemon {
  nDex: number;
  nome: string;
  tipoPrimario: TipoPokemon;
  tipoSecundario?: TipoPokemon;
  evoluirPara?: Array<string>;
  inicial: boolean;
  descricao: string;
  imagem: string;
}
