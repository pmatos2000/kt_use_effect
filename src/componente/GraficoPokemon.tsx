import { FC, useEffect, useState } from "react";
import { Pokemon } from "../tipos/Pokemon";
import ReactApexChart from "react-apexcharts";
import { ImutavelArray } from "../tipos/ImutavelArray";
import { DicionarioTipoPokemonCor } from "../compartilhado/util/Constantes";

interface GraficoPokemonProps {
  listaPokemon: ImutavelArray<Pokemon>;
}

const processarDados = (listaPokemon: ImutavelArray<Pokemon>) => {
  const listaTipoPokemon = listaPokemon
    .map((pkm) =>
      pkm.tipoSecundario
        ? [pkm.tipoPrimario, pkm.tipoSecundario]
        : [pkm.tipoPrimario]
    )
    .flatMap((tipo) => tipo)
    .filter((value, index, self) => self.indexOf(value) === index);

  const totalPorTipo = listaTipoPokemon.map(
    (tipo) =>
      listaPokemon.filter(
        (pkm) => pkm.tipoPrimario === tipo || pkm.tipoSecundario === tipo
      ).length
  );

  return {
    listaTipoPokemon,
    totalPorTipo,
  };
};

const GraficoPokemon: FC<GraficoPokemonProps> = ({ listaPokemon }) => {
  const totalPorTipo = processarDados(listaPokemon);
  const cores = totalPorTipo.listaTipoPokemon.map(
    (tipo) => DicionarioTipoPokemonCor[tipo]
  );

  console.log("GraficoPokemon");

  return (
    <ReactApexChart
      options={{
        title: {
          text: "Quantidade de tipos dos Pokémons",
          align: "center",
          style: { color: "#FFF" },
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: totalPorTipo.listaTipoPokemon,
          labels: {
            style: {
              colors: "#fff",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          colors: cores,
        },
        tooltip: {
          enabled: false,
        },
      }}
      series={[
        {
          data: totalPorTipo.totalPorTipo,
        },
      ]}
      type="bar"
      height={350}
    />
  );
};

export default GraficoPokemon;
