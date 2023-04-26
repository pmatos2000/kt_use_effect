import { FC, memo } from "react";

interface EntradaTextoProps {
  valor?: string;
  onChange?: (novoValor: string) => void;
  placeholder?: string;
  desativado?: boolean;
}

const EntradaTexto: FC<EntradaTextoProps> = ({
  valor,
  onChange,
  placeholder,
  desativado,
}) => {
  return (
    <input
      className="
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
      "
      value={valor}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      disabled={desativado}
    />
  );
};

export default memo(EntradaTexto);
