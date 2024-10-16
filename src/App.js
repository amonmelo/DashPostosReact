import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Grid, Card, CardContent, Typography, Box, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import dayjs from 'dayjs';
import { createClient } from '@supabase/supabase-js';

// Inicializando o Supabase Client
const supabaseUrl = 'Suaurl';
const supabaseKey = 'SUA KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4563'];

function App() {
  const [data, setData] = useState({
    salesByNozzle: [],
    salesByPaymentMethod: [],
    salesByShift: [],
    topClients: [],
    sangria: 0,
    suprimento: 0,
  });
  const [sortCriteria, setSortCriteria] = useState('maior');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  // Função para buscar dados do Supabase
  const fetchData = async (date) => {
    const { data: salesByNozzle } = await supabase
      .from('vendas_por_bico')
      .select('*')
      .eq('data_venda', date);

    const { data: salesByPaymentMethod } = await supabase
      .from('vendas_por_forma_pagamento')
      .select('*')
      .eq('data_venda', date);

    const { data: salesByShift } = await supabase
      .from('vendas_por_turno')
      .select('*')
      .eq('data_venda', date);

    const { data: topClients } = await supabase
      .from('clientes_top')
      .select('*')
      .eq('data_venda', date);

    const { data: sangriaSuprimento } = await supabase
      .from('sangria_suprimento')
      .select('*')
      .eq('data_venda', date);

    if (sangriaSuprimento.length > 0) {
      setData({
        salesByNozzle,
        salesByPaymentMethod,
        salesByShift,
        topClients,
        sangria: sangriaSuprimento[0].valor_sangria,
        suprimento: sangriaSuprimento[0].valor_suprimento,
      });
    }
  };

  // Função para ordenar os dados
  const sortData = (criteria, dataToSort, key, isNumeric = false) => {
    if (isNumeric) {
      if (criteria === 'maior') {
        return dataToSort.sort((a, b) => b[key] - a[key]);
      }
      if (criteria === 'menor') {
        return dataToSort.sort((a, b) => a[key] - b[key]);
      }
    } else {
      if (criteria === 'alfabetica') {
        return dataToSort.sort((a, b) => {
          if (typeof a[key] === 'string' && typeof b[key] === 'string') {
            return a[key].localeCompare(b[key]);
          }
          return 0;
        });
      }
    }
    return dataToSort;
  };

  // Função chamada ao mudar o critério de ordenação
  const handleSortChange = (event) => {
    const criteria = event.target.value;
    setSortCriteria(criteria);

    // Aplicar ordenação conforme o critério selecionado
    setData((prevData) => ({
      ...prevData,
      salesByNozzle: sortData(criteria, prevData.salesByNozzle, 'total_vendas', true), // Ordenar por total de vendas (numérico)
      salesByPaymentMethod: sortData(criteria, prevData.salesByPaymentMethod, 'total_vendas', true), // Ordenar por total de vendas (numérico)
      salesByShift: sortData(criteria, prevData.salesByShift, 'total_vendas', true), // Ordenar por total de vendas (numérico)
      topClients: sortData(criteria, prevData.topClients, 'total_vendas', true), // Ordenar por total de vendas (numérico)

      // Para a ordenação alfabética:
      salesByNozzle: sortData(criteria, prevData.salesByNozzle, 'tipo_combustivel'), // Ordenar por nome do combustível
      salesByPaymentMethod: sortData(criteria, prevData.salesByPaymentMethod, 'forma_pagamento'), // Ordenar por forma de pagamento
      salesByShift: sortData(criteria, prevData.salesByShift, 'nome_turno'), // Ordenar por nome do turno
      topClients: sortData(criteria, prevData.topClients, 'nome_cliente'), // Ordenar por nome do cliente
    }));
  };

  // Função para lidar com mudança de data
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Carregar dados quando a página carregar ou a data mudar
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      {/* Definindo o título da guia do navegador */}
      <Helmet>
        <title>Dash Postos</title>
      </Helmet>

      {/* Título em duas linhas */}
      <Box textAlign="center" mb={2}>
        <Typography variant="h4" color="primary">
          Dash React
        </Typography>
        <Typography variant="h5" color="textSecondary">
          ⛽Posto Teste⛽
        </Typography>
      </Box>

      {/* Opções de ordenação e seleção de data */}
      <Box mb={4} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: '10px' }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select value={sortCriteria} onChange={handleSortChange} label="Ordenar por">
            <MenuItem value="maior">Maior para Menor</MenuItem>
            <MenuItem value="menor">Menor para Maior</MenuItem>
            <MenuItem value="alfabetica">Ordem Alfabética</MenuItem>
          </Select>
        </FormControl>

        {/* Campo de data */}
        <TextField
          id="date"
          label="Selecionar Data"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ minWidth: 200 }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Gráfico de Vendas por Bico */}
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Vendas por Bico ⛽
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={data.salesByNozzle} margin={{ left: 50 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="tipo_combustivel" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="litros_vendidos" fill="#00C49F" name="Litros Vendidos">
                    {data.salesByNozzle.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {data.salesByNozzle.map((sale, index) => (
                <Box key={index} display="flex" alignItems="center" mt={2}>
                  <LocalGasStationIcon style={{ marginRight: '10px' }} />
                  <Typography variant="body1">
                    Bico {sale.numero_bico}: {sale.tipo_combustivel} - <strong>{sale.litros_vendidos} litros vendidos</strong> (R$ {sale.total_vendas})
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Vendas por Forma de Pagamento */}
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Vendas por Forma de Pagamento 💰
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={data.salesByPaymentMethod} margin={{ left: 50 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="forma_pagamento" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="total_vendas" fill="#8884d8" name="Valor Total">
                    {data.salesByPaymentMethod.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {data.salesByPaymentMethod.map((payment, index) => (
                <Box key={index} mt={2}>
                  <Typography variant="body1">
                    💳 {payment.forma_pagamento}: <strong>R$ {payment.total_vendas}</strong>
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Vendas por Turno */}
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Vendas por Turno ⏰
              </Typography>
              {data.salesByShift.map((shift, index) => (
                <Box key={index} mt={1}>
                  <Typography variant="body1">
                    {shift.nome_turno} - Operador: {shift.nome_operador}: <strong>R$ {shift.total_vendas}</strong>
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Sangria e Suprimento */}
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Sangria e Suprimento 💵
              </Typography>
              <Typography variant="body1" mt={1}>
                Sangria: <strong>R$ {data.sangria}</strong>
              </Typography>
              <Typography variant="body1" mt={1}>
                Suprimento: <strong>R$ {data.suprimento}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top 5 Clientes */}
        <Grid item xs={12} md={6}>
          <Card style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Top Clientes 🏆
              </Typography>
              <ul style={{ paddingLeft: '20px', listStyleType: 'none' }}>
                {data.topClients.map((client, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <Typography variant="body1">
                      <strong>{index + 1}. {client.nome_cliente}:</strong> R$ {client.total_vendas}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
