import { FC, useState } from "react";
import Card from "./Card";
import { Pokemon } from "../tipos/Pokemon";
import EntradaTexto from "./EntradaTexto";
import { Nullable } from "../tipos/Nullable";

interface CardComentarioProps {
  pokemon?: Nullable<Pokemon>;
}

const CardComentario: FC<CardComentarioProps> = ({ pokemon }) => {
  const [tituloComentario, setTituloComentario] = useState("");
  const [comentario, setComentario] = useState("");

  const ativo = Boolean(pokemon);

  return (
    <Card largura="128" altura="128">
      <div className="flex flex-col gap-4">
        <h2>
          {ativo
            ? `Escreva um comentário para ${pokemon?.nome}`
            : "Caixa de comentário"}
        </h2>
        <EntradaTexto
          valor={tituloComentario}
          onChange={(novoValor) => setTituloComentario(novoValor)}
          placeholder={ativo ? "Titulo..." : ""}
          desativado={!ativo}
        />
        <textarea
          className="
          h-full
          w-full
          rounded
          bg-emerald-800
          border-2
          border-emerald-700
          hover:border-emerald-600
          focus:outline-none
          focus:border-emerald-500
          p-2
          placeholder-emerald-950
          disabled:bg-neutral-700	
          disabled:border-neutral-800	
          resize-none"
          onChange={(e) => setComentario(e.target.value)}
          value={comentario}
          rows={12}
          placeholder={ativo ? "Comentário..." : ""}
          disabled={!ativo}
        />
      </div>
    </Card>
  );
};

export default CardComentario;
