import { FC } from "react";

interface BotaoProps {
  children?: string;
  desativado?: boolean;
}

const Botao: FC<BotaoProps> = ({ children, desativado }) => {
  return (
    <button
      className="
        bg-emerald-600
        hover:bg-emerald-700
        disabled:bg-neutral-700	
        disabled:text-neutral-800
        text-white
        font-bold
        py-2
        px-4
        rounded"
      disabled={desativado}
    >
      {children}
    </button>
  );
};

export default Botao;
