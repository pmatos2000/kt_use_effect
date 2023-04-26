import { FC } from "react";
import { Pokemon } from "../tipos/Pokemon";
import Card from "./Card";
import { TiDeleteOutline } from "react-icons/ti";

interface ICardPequenoProps {
  pokemon: Pokemon;
  emExclusaoCard?: (nDex: number) => void;
  onClick?: () => void;
  selecionado?: boolean;
}

const CardPequenoPokemon: FC<ICardPequenoProps> = ({
  pokemon,
  emExclusaoCard,
  onClick,
  selecionado,
}) => {
  return (
    <div className="relative">
      {emExclusaoCard && (
        <TiDeleteOutline
          size={24}
          className="
            absolute
            right-2
            top-2
            cursor-pointer
            fill-emerald-500
            hover:fill-emerald-400"
          onClick={() => emExclusaoCard(pokemon.nDex)}
        />
      )}
      <Card
        key={pokemon.nDex}
        largura="36"
        altura="36"
        onCLick={onClick}
        selecionado={selecionado}
      >
        <div className="flex flex-col items-center">
          <img className="w-24" src={pokemon.imagem} />
          <h2>{pokemon.nome}</h2>
        </div>
      </Card>
    </div>
  );
};

export default CardPequenoPokemon;
