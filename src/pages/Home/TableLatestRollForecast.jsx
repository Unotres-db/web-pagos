import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableLatest = () => {
  // Sample data with the specified lines for 2 years
  const data = [
    {
      year: 2022,
      revenue: 100000,
      costOfLand: 20000,
      constructionCost: 40000,
      grossMargin: 40000,
      projectExpenses: 15000,
      investorParticipation: 25000,
      cobaExpenses: 10000,
      interestExpenses: 5000,
      vatCredit: 3000,
      incomeTaxes: 8000,
      netIncome: 20000,
    },
    {
      year: 2021,
      revenue: 90000,
      costOfLand: 18000,
      constructionCost: 38000,
      grossMargin: 34000,
      projectExpenses: 14000,
      investorParticipation: 23000,
      cobaExpenses: 9000,
      interestExpenses: 4500,
      vatCredit: 2800,
      incomeTaxes: 7500,
      netIncome: 19000,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Año</TableCell>
            <TableCell>Ingresos</TableCell>
            <TableCell>Costo de Terreno</TableCell>
            <TableCell>Costo de Construcción</TableCell>
            <TableCell>Margen Bruto</TableCell>
            <TableCell>Gastos del Proyecto</TableCell>
            <TableCell>Participación de Inversionistas</TableCell>
            <TableCell>Gastos COBA</TableCell>
            <TableCell>Gastos de Intereses</TableCell>
            <TableCell>Crédito de IVA</TableCell>
            <TableCell>Impuestos de Renta</TableCell>
            <TableCell>Utilidad Neta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.year}>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.revenue}</TableCell>
              <TableCell>{row.costOfLand}</TableCell>
              <TableCell>{row.constructionCost}</TableCell>
              <TableCell>{row.grossMargin}</TableCell>
              <TableCell>{row.projectExpenses}</TableCell>
              <TableCell>{row.investorParticipation}</TableCell>
              <TableCell>{row.cobaExpenses}</TableCell>
              <TableCell>{row.interestExpenses}</TableCell>
              <TableCell>{row.vatCredit}</TableCell>
              <TableCell>{row.incomeTaxes}</TableCell>
              <TableCell>{row.netIncome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLatest;

