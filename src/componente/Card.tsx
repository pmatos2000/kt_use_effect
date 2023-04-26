import { FC } from "react";
import { Comprimento } from "../tipos/Comprimento";
import {
  DicionarioEstiloAltura,
  DicionarioEstiloLargura,
} from "../compartilhado/util/Constantes";

type CardProps = {
  children?: React.ReactNode;
  largura: Comprimento;
  altura?: Comprimento;
  onCLick?: () => void;
  selecionado?: boolean;
};

const Card: FC<CardProps> = ({
  children,
  largura,
  altura,
  onCLick,
  selecionado,
}) => {
  return (
    <div
      className={`
        ${DicionarioEstiloLargura[largura]}
        ${altura ? DicionarioEstiloAltura[altura] : ""}
        m-2
        rounded 
        overflow-hidden
        bg-emerald-900
        shadow-lg
        ${onCLick ? "cursor-pointer" : ""}
        ${selecionado ? "border-2 border-solid border-emerald-500" : ""}`}
      onClick={() => onCLick && onCLick()}
    >
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Card;
