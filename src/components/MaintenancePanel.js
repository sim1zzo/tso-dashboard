import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Table,
  Tag,
  Button,
  DatePicker,
  Select,
  Modal,
  Form,
  Input,
} from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const MaintenanceContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #1890ff;
  margin-bottom: 20px;
`;

const Section = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const MaintenanceTab = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [assetType, setAssetType] = useState('all');
  const [form] = Form.useForm();

  useEffect(() => {
    // Simula il caricamento dei dati
    const fetchData = async () => {
      setLoading(true);
      // In un'applicazione reale, questi dati proverrebbero da una API
      const mockMaintenanceData = [
        {
          id: '1',
          asset: 'Linea 380kV Roma-Firenze',
          startDate: '2023-07-15',
          endDate: '2023-07-20',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Approvato',
        },
        {
          id: '2',
          asset: 'Trasformatore AT/MT Milano Nord',
          startDate: '2023-08-01',
          endDate: '2023-08-03',
          type: 'Urgente',
          impact: 'Basso',
          status: 'In revisione',
        },
        {
          id: '3',
          asset: 'Sottostazione Napoli Est',
          startDate: '2023-08-10',
          endDate: '2023-08-15',
          type: 'Programmata',
          impact: 'Alto',
          status: 'Approvato',
        },
        {
          id: '4',
          asset: 'Linea 220kV Torino-Aosta',
          startDate: '2023-09-05',
          endDate: '2023-09-07',
          type: 'Programmata',
          impact: 'Basso',
          status: 'Pianificato',
        },
        {
          id: '5',
          asset: 'Reattore shunt Palermo',
          startDate: '2023-09-20',
          endDate: '2023-09-22',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Approvato',
        },
        {
          id: '6',
          asset: 'Interruttore AT Firenze Sud',
          startDate: '2023-10-01',
          endDate: '2023-10-02',
          type: 'Urgente',
          impact: 'Basso',
          status: 'In corso',
        },
        {
          id: '7',
          asset: 'Compensatore sincrono Brindisi',
          startDate: '2023-10-15',
          endDate: '2023-10-20',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Pianificato',
        },
        {
          id: '8',
          asset: 'Linea 150kV Catania-Siracusa',
          startDate: '2023-11-01',
          endDate: '2023-11-05',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Approvato',
        },
        {
          id: '9',
          asset: 'Trasformatore MT/BT Bologna Ovest',
          startDate: '2023-11-10',
          endDate: '2023-11-12',
          type: 'Programmata',
          impact: 'Basso',
          status: 'Pianificato',
        },
        {
          id: '10',
          asset: 'Sistema SCADA Centrale Roma',
          startDate: '2023-11-20',
          endDate: '2023-11-21',
          type: 'Urgente',
          impact: 'Alto',
          status: 'In revisione',
        },
        {
          id: '11',
          asset: 'Banco di condensatori Venezia',
          startDate: '2023-12-01',
          endDate: '2023-12-03',
          type: 'Programmata',
          impact: 'Basso',
          status: 'Approvato',
        },
        {
          id: '12',
          asset: 'Linea 380kV Milano-Torino',
          startDate: '2023-12-10',
          endDate: '2023-12-15',
          type: 'Programmata',
          impact: 'Alto',
          status: 'Pianificato',
        },
        {
          id: '13',
          asset: 'Sottostazione Genova Porto',
          startDate: '2024-01-05',
          endDate: '2024-01-10',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Approvato',
        },
        {
          id: '14',
          asset: 'Dispositivo PMU Cagliari',
          startDate: '2024-01-15',
          endDate: '2024-01-16',
          type: 'Urgente',
          impact: 'Basso',
          status: 'In corso',
        },
        {
          id: '15',
          asset: 'Trasformatore AT/MT Bari Nord',
          startDate: '2024-02-01',
          endDate: '2024-02-05',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Pianificato',
        },
        {
          id: '16',
          asset: 'Sistema di protezione Firenze Est',
          startDate: '2024-02-15',
          endDate: '2024-02-17',
          type: 'Programmata',
          impact: 'Alto',
          status: 'In revisione',
        },
        {
          id: '17',
          asset: 'Linea 220kV Palermo-Trapani',
          startDate: '2024-03-01',
          endDate: '2024-03-05',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Approvato',
        },
        {
          id: '18',
          asset: 'RTU Sottostazione Verona',
          startDate: '2024-03-10',
          endDate: '2024-03-11',
          type: 'Urgente',
          impact: 'Basso',
          status: 'In corso',
        },
        {
          id: '19',
          asset: 'Compensatore statico Napoli',
          startDate: '2024-03-20',
          endDate: '2024-03-25',
          type: 'Programmata',
          impact: 'Alto',
          status: 'Pianificato',
        },
        {
          id: '20',
          asset: 'Linea 150kV Perugia-Terni',
          startDate: '2024-04-01',
          endDate: '2024-04-05',
          type: 'Programmata',
          impact: 'Medio',
          status: 'Approvato',
        },
        {
          id: '21',
          asset: 'IED Protezione distanza Bologna',
          startDate: '2024-04-10',
          endDate: '2024-04-11',
          type: 'Urgente',
          impact: 'Basso',
          status: 'In revisione',
        },
        {
          id: '22',
          asset: 'Sistema di monitoraggio ambientale Centrale Brindisi',
          startDate: '2024-04-20',
          endDate: '2024-04-22',
          type: 'Programmata',
          impact: 'Basso',
          status: 'Pianificato',
        },
      ];
      const mockAvailabilityData = [
        { month: 'Gen', availability: 99.8 },
        { month: 'Feb', availability: 99.9 },
        { month: 'Mar', availability: 99.7 },
        { month: 'Apr', availability: 99.8 },
        { month: 'Mag', availability: 99.9 },
        { month: 'Giu', availability: 99.8 },
      ];

      setMaintenanceData(mockMaintenanceData);
      setAvailabilityData(mockAvailabilityData);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [maintenanceData, dateRange, assetType]);

  const filterData = () => {
    let filtered = [...maintenanceData];

    // Filtra per tipo di asset
    if (assetType !== 'all') {
      filtered = filtered.filter(item => {
        switch(assetType) {
          case 'lines':
            return item.asset.toLowerCase().includes('linea');
          case 'transformers':
            return item.asset.toLowerCase().includes('trasformatore');
          case 'substations':
            return item.asset.toLowerCase().includes('sottostazione');
          case 'devices':
            return !item.asset.toLowerCase().includes('linea') &&
                   !item.asset.toLowerCase().includes('trasformatore') &&
                   !item.asset.toLowerCase().includes('sottostazione');
          default:
            return true;
        }
      });
    }// Filtra per intervallo di date
    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      filtered = filtered.filter(item => {
        const itemStart = moment(item.startDate);
        const itemEnd = moment(item.endDate);
        return itemStart.isSameOrAfter(start, 'day') && itemEnd.isSameOrBefore(end, 'day');
      });
    }

    setFilteredData(filtered);
  };
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleAssetTypeChange = (value) => {
    setAssetType(value);
  };

  const showEditModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      startDate: record.startDate ? moment(record.startDate) : null,
      endDate: record.endDate ? moment(record.endDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = maintenanceData.map(item =>
        item.id === editingRecord.id ? { 
          ...item, 
          ...values,
          startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
          endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
        } : item
      );
      setMaintenanceData(updatedData);
      setIsModalVisible(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Asset',
      dataIndex: 'asset',
      key: 'asset',
    },
    {
      title: 'Data Inizio',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Data Fine',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'Programmata' ? 'green' : 'volcano'}>{type}</Tag>
      ),
    },
    {
      title: 'Impatto',
      dataIndex: 'impact',
      key: 'impact',
    },
    {
      title: 'Stato',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Approvato' ? 'blue' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Azioni',
      key: 'actions',
      render: (text, record) => (
        <Button size='small' onClick={() => showEditModal(record)}>
          Modifica
        </Button>
      ),
    },
  ];

  return (
    <MaintenanceContainer>
      <Title>Pianificazione Manutenzione e Outage</Title>
      
      <Section>
        <SectionTitle>Manutenzioni Programmate</SectionTitle>
        <FilterContainer>
          <RangePicker onChange={handleDateRangeChange} />
          <Select defaultValue='all' style={{ width: 120 }} onChange={handleAssetTypeChange}>
            <Option value='all'>Tutti gli asset</Option>
            <Option value='lines'>Linee</Option>
            <Option value='transformers'>Trasformatori</Option>
            <Option value='substations'>Sottostazioni</Option>
            <Option value='devices'>Dispositivi</Option>
          </Select>
        </FilterContainer>
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          loading={loading}
          rowKey="id"
        />
      </Section>

      <Section>
        <SectionTitle>Disponibilità della Rete</SectionTitle>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={availabilityData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis domain={[99, 100]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey='availability'
              fill='#8884d8'
              name='Disponibilità (%)'
            />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      <Section>
        <SectionTitle>Indicatori Chiave di Performance</SectionTitle>
        <ul>
          <li>SAIDI (System Average Interruption Duration Index): 15 minuti</li>
          <li>SAIFI (System Average Interruption Frequency Index): 0.2</li>
          <li>Tasso di completamento manutenzioni programmate: 98%</li>
          <li>Tempo medio di risposta per manutenzioni urgenti: 4 ore</li>
        </ul>
      </Section>

      <Modal
        title="Modifica Manutenzione"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='asset' label='Asset' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='startDate'
            label='Data Inizio'
            rules={[{ required: true }]}
          >
            <DatePicker format='YYYY-MM-DD' />
          </Form.Item>
          <Form.Item
            name='endDate'
            label='Data Fine'
            rules={[{ required: true }]}
          >
            <DatePicker format='YYYY-MM-DD' />
          </Form.Item>
          <Form.Item name='type' label='Tipo' rules={[{ required: true }]}>
            <Select>
              <Option value='Programmata'>Programmata</Option>
              <Option value='Urgente'>Urgente</Option>
            </Select>
          </Form.Item>
          <Form.Item name='impact' label='Impatto' rules={[{ required: true }]}>
            <Select>
              <Option value='Basso'>Basso</Option>
              <Option value='Medio'>Medio</Option>
              <Option value='Alto'>Alto</Option>
            </Select>
          </Form.Item>
          <Form.Item name='status' label='Stato' rules={[{ required: true }]}>
            <Select>
              <Option value='Pianificato'>Pianificato</Option>
              <Option value='Approvato'>Approvato</Option>
              <Option value='In revisione'>In revisione</Option>
              <Option value='In corso'>In corso</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </MaintenanceContainer>
  );
};

export default MaintenanceTab;
