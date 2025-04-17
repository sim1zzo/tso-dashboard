import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Button, Input, DatePicker, Select } from 'antd';
import { DownloadOutlined, LineChartOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const PanelContainer = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
`;

// Funzione per generare dati fittizi
const generateMockData = () => {
  const measureTypes = ['Tensione', 'Corrente', 'Potenza'];
  const data = [];
  const startDate = moment().subtract(30, 'days');

  for (let i = 0; i < 1000; i++) {
    const date = moment(startDate).add(i, 'hours');
    measureTypes.forEach(type => {
      data.push({
        id: `${i}-${type}`,
        date: date.format('YYYY-MM-DD'),
        time: date.format('HH:mm:ss'),
        measureType: type,
        value: Math.random() * 100 + 100, // Valore casuale tra 100 e 200
      });
    });
  }

  return data;
};

const RawDataPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: [],
    measureType: '',
    searchText: '',
  });
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // Simula il caricamento dei dati
    setLoading(true);
    setTimeout(() => {
      const mockData = generateMockData();
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDownload = () => {
    // Implementare la logica per il download dei dati
    console.log('Downloading data...');
  };

  const columns = [
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Ora',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Tipo di Misura',
      dataIndex: 'measureType',
      key: 'measureType',
    },
    {
      title: 'Valore',
      dataIndex: 'value',
      key: 'value',
      render: (value) => value.toFixed(2),
    },
  ];

  const filteredData = data.filter(item => {
    const dateInRange = filters.dateRange.length === 0 || 
      (moment(item.date).isSameOrAfter(filters.dateRange[0], 'day') && 
       moment(item.date).isSameOrBefore(filters.dateRange[1], 'day'));
    const matchesMeasureType = !filters.measureType || item.measureType === filters.measureType;
    const matchesSearch = !filters.searchText || 
      Object.values(item).some(val => 
        val.toString().toLowerCase().includes(filters.searchText.toLowerCase())
      );
    return dateInRange && matchesMeasureType && matchesSearch;
  });

  const renderChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={filteredData.slice(0, 100)}> {/* Limitiamo a 100 punti per performance */}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" name="Valore" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <PanelContainer>
      <h2>Dati Grezzi TSO</h2>
      <FilterContainer>
        <RangePicker
          onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
        />
        <Select
          style={{ width: 200 }}
          placeholder="Tipo di Misura"
          onChange={(value) => setFilters({ ...filters, measureType: value })}
        >
          <Option value="">Tutti</Option>
          <Option value="Tensione">Tensione</Option>
          <Option value="Corrente">Corrente</Option>
          <Option value="Potenza">Potenza</Option>
        </Select>
        <Input.Search
          placeholder="Cerca..."
          onSearch={(value) => setFilters({ ...filters, searchText: value })}
          style={{ width: 200 }}
        />
        <Button icon={<DownloadOutlined />} onClick={handleDownload}>
          Scarica
        </Button>
        <Button icon={<LineChartOutlined />} onClick={() => setShowChart(!showChart)}>
          {showChart ? 'Nascondi Grafico' : 'Mostra Grafico'}
        </Button>
      </FilterContainer>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      {showChart && (
        <ChartContainer>
          {renderChart()}
        </ChartContainer>
      )}
    </PanelContainer>
  );
};

export default RawDataPanel;