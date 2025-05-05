import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench,
  Calendar,
  Battery,
  AlertTriangle,
  BarChart2,
  Clock,
  Activity,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Zap,
  Database,
  Cpu,
  Gauge,
  Info,
  TrendingUp,
  PieChart,
  Award,
  Shield,
  Settings,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import styled from 'styled-components';

// Styled components for the predictive maintenance UI
const Container = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0 0 0 10px;
  font-size: 24px;
  color: #333;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: #333;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.color || '#3385ad'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#2a6d8e'};
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  min-width: 150px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor || '#f5f5f5'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.color || '#333'};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button`
  padding: 12px 20px;
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? '#3385ad' : 'transparent')};
  color: ${(props) => (props.active ? '#3385ad' : '#666')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    color: #3385ad;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px 20px;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;

  input {
    width: 100%;
    padding: 8px 8px 8px 32px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #3385ad;
      box-shadow: 0 0 0 2px rgba(51, 133, 173, 0.2);
    }
  }

  .search-icon {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
  }

  .clear-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    cursor: pointer;

    &:hover {
      color: #333;
    }
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  min-width: 150px;

  select {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    appearance: none;
    background-color: white;

    &:focus {
      outline: none;
      border-color: #3385ad;
      box-shadow: 0 0 0 2px rgba(51, 133, 173, 0.2);
    }
  }

  .select-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    pointer-events: none;
  }
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
  padding: 0 20px 20px;
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  padding: 16px;
`;

const EquipmentList = styled.div`
  padding: 0 20px 20px;
`;

const EquipmentItem = styled.div`
  border-left: 4px solid
    ${(props) => {
      switch (props.status) {
        case 'Buono':
          return '#4caf50';
        case 'Attenzione':
          return '#ffc107';
        case 'Critico':
          return '#f44336';
        default:
          return '#757575';
      }
    }};
  background-color: white;
  border-radius: 4px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const EquipmentInfo = styled.div`
  padding: 15px;
`;

const EquipmentTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const EquipmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
`;

const DetailIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #888;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.variant) {
      case 'success':
        return 'rgba(76, 175, 80, 0.1)';
      case 'warning':
        return 'rgba(255, 193, 7, 0.1)';
      case 'danger':
        return 'rgba(244, 67, 54, 0.1)';
      default:
        return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case 'success':
        return '#4caf50';
      case 'warning':
        return '#ffc107';
      case 'danger':
        return '#f44336';
      default:
        return '#757575';
    }
  }};
  margin-left: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;

  .progress-inner {
    height: 100%;
    background-color: ${(props) => {
      if (props.value >= 80) return '#4caf50';
      if (props.value >= 60) return '#ffc107';
      return '#f44336';
    }};
    width: ${(props) => `${props.value}%`};
    transition: width 0.3s ease;
  }
`;

const InsightCard = styled.div`
  background-color: ${(props) => props.bgColor || 'rgba(51, 133, 173, 0.1)'};
  border-left: 4px solid ${(props) => props.borderColor || '#3385ad'};
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const InsightTitle = styled.h4`
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.color || '#3385ad'};
`;

const PredictiveMaintenance = () => {
  // State Management
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [failureTrendData, setFailureTrendData] = useState([]);
  const [equipmentHealthData, setEquipmentHealthData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    status: 'Tutti',
    search: '',
    sortBy: 'nextMaintenance',
  });
  const [expandedInsights, setExpandedInsights] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Chart Colors
  const chartColors = {
    primary: '#3385ad',
    secondary: '#4caf50',
    tertiary: '#ffc107',
    quaternary: '#f44336',
    gridLine: '#eee',
  };

  // Advanced Data Generation
  const generateAdvancedSchedule = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const schedule = [
        {
          id: 1,
          equipment: 'Trasformatore Alta Tensione',
          nextMaintenance: '2024-08-15',
          remainingLifespan: '5 anni',
          status: 'Buono',
          criticality: 'Bassa',
          lastMaintenance: '2023-02-10',
          estimatedRepairCost: '€5,000',
          performanceScore: 92,
          riskFactor: 0.3,
        },
        {
          id: 2,
          equipment: 'Linea di Distribuzione Principale',
          nextMaintenance: '2024-09-01',
          remainingLifespan: '3 anni',
          status: 'Attenzione',
          criticality: 'Media',
          lastMaintenance: '2023-03-15',
          estimatedRepairCost: '€12,000',
          performanceScore: 75,
          riskFactor: 0.6,
        },
        {
          id: 3,
          equipment: 'Interruttore di Protezione Critico',
          nextMaintenance: '2024-07-30',
          remainingLifespan: '2 anni',
          status: 'Critico',
          criticality: 'Alta',
          lastMaintenance: '2023-01-05',
          estimatedRepairCost: '€25,000',
          performanceScore: 58,
          riskFactor: 0.9,
        },
        {
          id: 4,
          equipment: 'Sottostazione Elettrica',
          nextMaintenance: '2024-10-05',
          remainingLifespan: '4 anni',
          status: 'Buono',
          criticality: 'Bassa',
          lastMaintenance: '2023-04-20',
          estimatedRepairCost: '€8,000',
          performanceScore: 88,
          riskFactor: 0.2,
        },
      ];

      setMaintenanceSchedule(schedule);

      // Generate Equipment Health Data for Radar Chart
      const healthData = [
        {
          subject: 'Affidabilità',
          A: schedule[0].performanceScore,
          B: schedule[1].performanceScore,
          C: schedule[2].performanceScore,
          D: schedule[3].performanceScore,
          fullMark: 100,
        },
        {
          subject: 'Rischio',
          A: (1 - schedule[0].riskFactor) * 100,
          B: (1 - schedule[1].riskFactor) * 100,
          C: (1 - schedule[2].riskFactor) * 100,
          D: (1 - schedule[3].riskFactor) * 100,
          fullMark: 100,
        },
        {
          subject: 'Criticità',
          A:
            schedule[0].criticality === 'Bassa'
              ? 90
              : schedule[0].criticality === 'Media'
              ? 60
              : 30,
          B:
            schedule[1].criticality === 'Bassa'
              ? 90
              : schedule[1].criticality === 'Media'
              ? 60
              : 30,
          C:
            schedule[2].criticality === 'Bassa'
              ? 90
              : schedule[2].criticality === 'Media'
              ? 60
              : 30,
          D:
            schedule[3].criticality === 'Bassa'
              ? 90
              : schedule[3].criticality === 'Media'
              ? 60
              : 30,
          fullMark: 100,
        },
      ];
      setEquipmentHealthData(healthData);

      // Failure Trend Data with More Metrics
      const trendData = [
        {
          month: 'Gen',
          failures: 4,
          costs: 15000,
          duration: 2.5,
          efficiency: 92,
        },
        {
          month: 'Feb',
          failures: 3,
          costs: 12000,
          duration: 2.2,
          efficiency: 94,
        },
        {
          month: 'Mar',
          failures: 5,
          costs: 18000,
          duration: 3.0,
          efficiency: 88,
        },
        {
          month: 'Apr',
          failures: 6,
          costs: 22000,
          duration: 3.5,
          efficiency: 85,
        },
        {
          month: 'Mag',
          failures: 2,
          costs: 8000,
          duration: 1.5,
          efficiency: 96,
        },
        {
          month: 'Giu',
          failures: 4,
          costs: 16000,
          duration: 2.7,
          efficiency: 90,
        },
        {
          month: 'Lug',
          failures: 3,
          costs: 11000,
          duration: 2.0,
          efficiency: 93,
        },
        {
          month: 'Ago',
          failures: 5,
          costs: 19000,
          duration: 3.2,
          efficiency: 87,
        },
        {
          month: 'Set',
          failures: 4,
          costs: 15000,
          duration: 2.6,
          efficiency: 91,
        },
        {
          month: 'Ott',
          failures: 7,
          costs: 26000,
          duration: 4.1,
          efficiency: 83,
        },
        {
          month: 'Nov',
          failures: 6,
          costs: 23000,
          duration: 3.8,
          efficiency: 86,
        },
        {
          month: 'Dic',
          failures: 8,
          costs: 30000,
          duration: 4.5,
          efficiency: 80,
        },
      ];
      setFailureTrendData(trendData);

      setShowResults(true);
      setLoading(false);
    }, 1000);
  };

  // Filtered and Sorted Maintenance Schedule
  const filteredSchedule = useMemo(() => {
    return maintenanceSchedule
      .filter(
        (item) =>
          (filterCriteria.status === 'Tutti' ||
            item.status === filterCriteria.status) &&
          item.equipment
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase())
      )
      .sort((a, b) => {
        switch (filterCriteria.sortBy) {
          case 'nextMaintenance':
            return new Date(a.nextMaintenance) - new Date(b.nextMaintenance);
          case 'criticality':
            const criticalityOrder = { Alta: 3, Media: 2, Bassa: 1 };
            return (
              criticalityOrder[b.criticality] - criticalityOrder[a.criticality]
            );
          default:
            return 0;
        }
      });
  }, [maintenanceSchedule, filterCriteria]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('it-IT', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Get status variant for styling
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Buono':
        return 'success';
      case 'Attenzione':
        return 'warning';
      case 'Critico':
        return 'danger';
      default:
        return 'default';
    }
  };

  // Get criticality variant for styling
  const getCriticalityVariant = (criticality) => {
    switch (criticality) {
      case 'Bassa':
        return 'success';
      case 'Media':
        return 'warning';
      case 'Alta':
        return 'danger';
      default:
        return 'default';
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        >
          <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              style={{
                margin: '0',
                fontSize: '12px',
                color: entry.color,
              }}
            >
              {entry.name}: {entry.value}
              {entry.name === 'Costi' && '€'}
              {entry.name === 'Efficienza' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <Wrench size={28} color='#3385ad' />
        <Title>Manutenzione Predittiva Avanzata</Title>
      </Header>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            <IconWrapper>
              <Calendar />
            </IconWrapper>
            Gestione Manutenzione
          </CardTitle>
          <RefreshButton onClick={generateAdvancedSchedule} disabled={loading}>
            <RefreshCw
              size={18}
              style={{ marginRight: '5px' }}
              className={loading ? 'spin' : ''}
            />
            {loading ? 'Generazione...' : 'Genera Rapporto Completo'}
          </RefreshButton>
        </CardHeader>

        {showResults ? (
          <>
            <TabsContainer>
              <TabButton
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
              >
                <BarChart2 size={16} style={{ marginRight: '8px' }} />
                Panoramica
              </TabButton>
              <TabButton
                active={activeTab === 'details'}
                onClick={() => setActiveTab('details')}
              >
                <Database size={16} style={{ marginRight: '8px' }} />
                Dettagli Manutenzione
              </TabButton>
              <TabButton
                active={activeTab === 'predictions'}
                onClick={() => setActiveTab('predictions')}
              >
                <Cpu size={16} style={{ marginRight: '8px' }} />
                Previsioni
              </TabButton>
            </TabsContainer>

            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <>
                <FilterContainer>
                  <SearchInput>
                    <Search className='search-icon' size={16} />
                    <input
                      type='text'
                      placeholder='Cerca Attrezzatura'
                      value={filterCriteria.search}
                      onChange={(e) =>
                        setFilterCriteria((prev) => ({
                          ...prev,
                          search: e.target.value,
                        }))
                      }
                    />
                    {filterCriteria.search && (
                      <X
                        className='clear-icon'
                        size={16}
                        onClick={() =>
                          setFilterCriteria((prev) => ({
                            ...prev,
                            search: '',
                          }))
                        }
                      />
                    )}
                  </SearchInput>
                  <SelectWrapper>
                    <select
                      value={filterCriteria.status}
                      onChange={(e) =>
                        setFilterCriteria((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value='Tutti'>Tutti gli Stati</option>
                      <option value='Buono'>Buono</option>
                      <option value='Attenzione'>Attenzione</option>
                      <option value='Critico'>Critico</option>
                    </select>
                    <ChevronDown className='select-icon' size={16} />
                  </SelectWrapper>
                  <SelectWrapper>
                    <select
                      value={filterCriteria.sortBy}
                      onChange={(e) =>
                        setFilterCriteria((prev) => ({
                          ...prev,
                          sortBy: e.target.value,
                        }))
                      }
                    >
                      <option value='nextMaintenance'>
                        Prossima Manutenzione
                      </option>
                      <option value='criticality'>Criticità</option>
                    </select>
                    <ChevronDown className='select-icon' size={16} />
                  </SelectWrapper>
                </FilterContainer>

                <StatsContainer>
                  <StatCard bgColor='rgba(51, 133, 173, 0.1)'>
                    <StatValue color='#3385ad'>
                      {maintenanceSchedule.length}
                    </StatValue>
                    <StatLabel>Manutenzioni Imminenti</StatLabel>
                  </StatCard>
                  <StatCard bgColor='rgba(76, 175, 80, 0.1)'>
                    <StatValue color='#4caf50'>3.3 anni</StatValue>
                    <StatLabel>Vita Utile Media</StatLabel>
                  </StatCard>
                  <StatCard bgColor='rgba(244, 67, 54, 0.1)'>
                    <StatValue color='#f44336'>2</StatValue>
                    <StatLabel>Componenti Critici</StatLabel>
                  </StatCard>
                </StatsContainer>

                <ChartContainer>
                  <ChartCard>
                    <CardHeader>
                      <CardTitle>
                        <IconWrapper>
                          <BarChart2 />
                        </IconWrapper>
                        Trend Guasti e Costi
                      </CardTitle>
                    </CardHeader>
                    <ChartWrapper>
                      <ResponsiveContainer width='100%' height='100%'>
                        <ComposedChart data={failureTrendData}>
                          <CartesianGrid
                            strokeDasharray='3 3'
                            stroke={chartColors.gridLine}
                          />
                          <XAxis
                            dataKey='month'
                            tick={{ fill: '#666' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                          />
                          <YAxis
                            yAxisId='left'
                            label={{
                              value: 'Guasti',
                              angle: -90,
                              position: 'insideLeft',
                              style: { fill: '#666', fontSize: 12 },
                            }}
                            tick={{ fill: '#666' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                          />
                          <YAxis
                            yAxisId='right'
                            orientation='right'
                            label={{
                              value: 'Costi (€)',
                              angle: 90,
                              position: 'insideRight',
                              style: { fill: '#666', fontSize: 12 },
                            }}
                            tick={{ fill: '#666' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend
                            iconType='circle'
                            wrapperStyle={{ paddingTop: 10 }}
                          />
                          <Line
                            type='monotone'
                            dataKey='failures'
                            stroke={chartColors.primary}
                            strokeWidth={2}
                            yAxisId='left'
                            name='Guasti'
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Bar
                            dataKey='costs'
                            barSize={20}
                            fill={chartColors.secondary}
                            yAxisId='right'
                            name='Costi'
                            radius={[4, 4, 0, 0]}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </ChartCard>

                  <ChartCard>
                    <CardHeader>
                      <CardTitle>
                        <IconWrapper>
                          <Gauge />
                        </IconWrapper>
                        Salute Apparecchiature
                      </CardTitle>
                    </CardHeader>
                    <ChartWrapper>
                      <ResponsiveContainer width='100%' height='100%'>
                        <RadarChart
                          outerRadius='70%'
                          data={equipmentHealthData}
                        >
                          <PolarGrid stroke='#e0e0e0' />
                          <PolarAngleAxis
                            dataKey='subject'
                            tick={{ fill: '#666', fontSize: 11 }}
                          />
                          <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={{ fill: '#666', fontSize: 10 }}
                          />
                          <Radar
                            name='Trasformatore'
                            dataKey='A'
                            stroke={chartColors.primary}
                            fill={chartColors.primary}
                            fillOpacity={0.2}
                          />
                          <Radar
                            name='Linea Distribuzione'
                            dataKey='B'
                            stroke={chartColors.secondary}
                            fill={chartColors.secondary}
                            fillOpacity={0.2}
                          />
                          <Radar
                            name='Interruttore'
                            dataKey='C'
                            stroke={chartColors.tertiary}
                            fill={chartColors.tertiary}
                            fillOpacity={0.2}
                          />
                          <Radar
                            name='Sottostazione'
                            dataKey='D'
                            stroke={chartColors.quaternary}
                            fill={chartColors.quaternary}
                            fillOpacity={0.2}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend
                            iconType='circle'
                            wrapperStyle={{ paddingTop: 10 }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </ChartCard>
                </ChartContainer>
              </>
            )}

            {/* Details Tab Content */}
            {activeTab === 'details' && (
              <EquipmentList>
                {filteredSchedule.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '30px',
                      color: '#666',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '4px',
                      margin: '0 20px',
                    }}
                  >
                    Nessun risultato trovato con i filtri correnti
                  </div>
                ) : (
                  filteredSchedule.map((item) => (
                    <EquipmentItem key={item.id} status={item.status}>
                      <EquipmentInfo>
                        <EquipmentTitle>
                          <IconWrapper>
                            <Wrench
                              color={
                                item.status === 'Buono'
                                  ? '#4caf50'
                                  : item.status === 'Attenzione'
                                  ? '#ffc107'
                                  : '#f44336'
                              }
                            />
                          </IconWrapper>
                          {item.equipment}
                          <Badge variant={getStatusVariant(item.status)}>
                            {item.status}
                          </Badge>
                          <Badge
                            variant={getCriticalityVariant(item.criticality)}
                          >
                            {item.criticality}
                          </Badge>
                        </EquipmentTitle>

                        <EquipmentDetails>
                          <DetailItem>
                            <DetailIcon>
                              <Calendar size={16} />
                            </DetailIcon>
                            <span>
                              Prossima Manutenzione:{' '}
                              {formatDate(item.nextMaintenance)}
                            </span>
                          </DetailItem>
                          <DetailItem>
                            <DetailIcon>
                              <Battery size={16} />
                            </DetailIcon>
                            <span>
                              Vita Utile Residua: {item.remainingLifespan}
                            </span>
                          </DetailItem>
                          <DetailItem>
                            <DetailIcon>
                              <Clock size={16} />
                            </DetailIcon>
                            <span>
                              Ultima Manutenzione:{' '}
                              {formatDate(item.lastMaintenance)}
                            </span>
                          </DetailItem>
                          <DetailItem>
                            <DetailIcon>
                              <Zap size={16} />
                            </DetailIcon>
                            <span>
                              Costo Stimato: {item.estimatedRepairCost}
                            </span>
                          </DetailItem>
                        </EquipmentDetails>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            marginTop: '15px',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '14px',
                                marginBottom: '5px',
                              }}
                            >
                              <span>Performance</span>
                              <span>{item.performanceScore}%</span>
                            </div>
                            <ProgressBar value={item.performanceScore}>
                              <div className='progress-inner'></div>
                            </ProgressBar>
                          </div>

                          <div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '14px',
                                marginBottom: '5px',
                              }}
                            >
                              <span>Fattore di Rischio</span>
                              <span>{(item.riskFactor * 100).toFixed(0)}%</span>
                            </div>
                            <ProgressBar value={item.riskFactor * 100}>
                              <div className='progress-inner'></div>
                            </ProgressBar>
                          </div>
                        </div>
                      </EquipmentInfo>
                    </EquipmentItem>
                  ))
                )}
              </EquipmentList>
            )}

            {/* Predictions Tab Content */}
            {activeTab === 'predictions' && (
              <>
                <ChartContainer>
                  <ChartCard>
                    <CardHeader>
                      <CardTitle>
                        <IconWrapper>
                          <Zap />
                        </IconWrapper>
                        Trend Efficienza
                      </CardTitle>
                    </CardHeader>
                    <ChartWrapper>
                      <ResponsiveContainer width='100%' height='100%'>
                        <AreaChart data={failureTrendData}>
                          <CartesianGrid strokeDasharray='3 3' stroke='#eee' />
                          <XAxis
                            dataKey='month'
                            tick={{ fill: '#666' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                          />
                          <YAxis
                            domain={[70, 100]}
                            tick={{ fill: '#666' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <defs>
                            <linearGradient
                              id='efficiencyGradient'
                              x1='0'
                              y1='0'
                              x2='0'
                              y2='1'
                            >
                              <stop
                                offset='5%'
                                stopColor={chartColors.primary}
                                stopOpacity={0.8}
                              />
                              <stop
                                offset='95%'
                                stopColor={chartColors.primary}
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type='monotone'
                            dataKey='efficiency'
                            stroke={chartColors.primary}
                            strokeWidth={2}
                            fill='url(#efficiencyGradient)'
                            name='Efficienza'
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </ChartCard>

                  <div style={{ padding: '20px' }}>
                    <InsightCard
                      bgColor='rgba(255, 193, 7, 0.1)'
                      borderColor='#ffc107'
                    >
                      <InsightTitle color='#ffc107'>
                        <AlertTriangle
                          size={18}
                          style={{ marginRight: '10px' }}
                        />
                        Previsione Criticità
                      </InsightTitle>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                        Basato sull'analisi dei dati, 2 componenti richiedono
                        manutenzione preventiva entro i prossimi 3 mesi.
                      </p>
                    </InsightCard>

                    <InsightCard
                      bgColor='rgba(76, 175, 80, 0.1)'
                      borderColor='#4caf50'
                    >
                      <InsightTitle color='#4caf50'>
                        <Battery size={18} style={{ marginRight: '10px' }} />
                        Stima Vita Utile
                      </InsightTitle>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                        La vita media stimata dei componenti è di 3.3 anni, con
                        potenziale estensione mediante manutenzione predittiva.
                      </p>
                    </InsightCard>

                    <InsightCard
                      bgColor='rgba(51, 133, 173, 0.1)'
                      borderColor='#3385ad'
                    >
                      <InsightTitle color='#3385ad'>
                        <RefreshCw size={18} style={{ marginRight: '10px' }} />
                        Ottimizzazione Continua
                      </InsightTitle>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                        Gli algoritmi di machine learning si adattano
                        continuamente, migliorando la precisione delle
                        previsioni con ogni nuovo dato.
                      </p>
                    </InsightCard>
                  </div>
                </ChartContainer>

                <div style={{ padding: '0 20px 20px' }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <IconWrapper>
                          <Settings />
                        </IconWrapper>
                        Raccomandazioni AI per Ottimizzazione
                      </CardTitle>
                    </CardHeader>

                    <div style={{ padding: '20px' }}>
                      <ul
                        style={{
                          listStyleType: 'none',
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <li
                          style={{
                            marginBottom: '15px',
                            paddingLeft: '30px',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '2px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(51, 133, 173, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#3385ad',
                            }}
                          >
                            1
                          </div>
                          <strong>Riduzione costi di manutenzione:</strong>{' '}
                          Pianificare la sostituzione dell'Interruttore di
                          Protezione Critico durante il ciclo di manutenzione
                          ordinaria ridurrebbe i costi del 18% e migliorerebbe
                          l'affidabilità del sistema.
                        </li>

                        <li
                          style={{
                            marginBottom: '15px',
                            paddingLeft: '30px',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '2px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(51, 133, 173, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#3385ad',
                            }}
                          >
                            2
                          </div>
                          <strong>Miglioramento efficienza:</strong>{' '}
                          L'ottimizzazione dei parametri operativi della Linea
                          di Distribuzione Principale potrebbe aumentare
                          l'efficienza del 7% riducendo il carico e le
                          temperature operative.
                        </li>

                        <li
                          style={{
                            paddingLeft: '30px',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '2px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(51, 133, 173, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#3385ad',
                            }}
                          >
                            3
                          </div>
                          <strong>Prevenzione guasti:</strong> Monitorare con
                          sensori aggiuntivi il Trasformatore Alta Tensione
                          potrebbe prevenire potenziali guasti e aumentare la
                          vita utile fino al 15%, con un ROI stimato del 320% in
                          5 anni.
                        </li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </>
            )}

            {/* Toggle Expanded Insights */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0 20px 20px',
              }}
            >
              <ActionButton
                onClick={() => setExpandedInsights(!expandedInsights)}
              >
                {expandedInsights ? (
                  <>
                    <ChevronUp size={16} style={{ marginRight: '8px' }} />
                    Nascondi Approfondimenti
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} style={{ marginRight: '8px' }} />
                    Mostra Approfondimenti
                  </>
                )}
              </ActionButton>
            </div>

            {/* Expanded System Insights */}
            {expandedInsights && (
              <div style={{ padding: '0 20px 20px' }}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <IconWrapper>
                        <Activity />
                      </IconWrapper>
                      Approfondimenti Dettagliati del Sistema
                    </CardTitle>
                  </CardHeader>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '20px',
                      padding: '20px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#f9f9f9',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'rgba(255, 193, 7, 0.1)',
                            color: '#ffc107',
                            borderRadius: '8px',
                            padding: '10px',
                            marginRight: '15px',
                          }}
                        >
                          <AlertTriangle size={24} />
                        </div>
                        <div>
                          <h4
                            style={{
                              margin: '0 0 10px 0',
                              fontSize: '16px',
                            }}
                          >
                            Rilevamento Anomalie Avanzato
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '14px',
                              color: '#666',
                              lineHeight: '1.5',
                            }}
                          >
                            Utilizziamo algoritmi avanzati di anomaly detection
                            basati su machine learning per identificare
                            potenziali guasti con precisione del 92%.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#f9f9f9',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            color: '#4caf50',
                            borderRadius: '8px',
                            padding: '10px',
                            marginRight: '15px',
                          }}
                        >
                          <BarChart2 size={24} />
                        </div>
                        <div>
                          <h4
                            style={{
                              margin: '0 0 10px 0',
                              fontSize: '16px',
                            }}
                          >
                            Analisi Predittiva Integrata
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '14px',
                              color: '#666',
                              lineHeight: '1.5',
                            }}
                          >
                            L'analisi predittiva integra dati storici, sensori
                            IoT e modelli di apprendimento automatico per
                            stimare con precisione la vita utile residua dei
                            componenti.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#f9f9f9',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'rgba(51, 133, 173, 0.1)',
                            color: '#3385ad',
                            borderRadius: '8px',
                            padding: '10px',
                            marginRight: '15px',
                          }}
                        >
                          <RefreshCw size={24} />
                        </div>
                        <div>
                          <h4
                            style={{
                              margin: '0 0 10px 0',
                              fontSize: '16px',
                            }}
                          >
                            Ottimizzazione Adattiva
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '14px',
                              color: '#666',
                              lineHeight: '1.5',
                            }}
                          >
                            Il sistema si adatta dinamicamente, ottimizzando
                            automaticamente i programmi di manutenzione
                            basandosi su dati in tempo reale e contesti
                            operativi mutevoli.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#f9f9f9',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
                            color: '#9c27b0',
                            borderRadius: '8px',
                            padding: '10px',
                            marginRight: '15px',
                          }}
                        >
                          <Filter size={24} />
                        </div>
                        <div>
                          <h4
                            style={{
                              margin: '0 0 10px 0',
                              fontSize: '16px',
                            }}
                          >
                            Filtri Predittivi Multi-livello
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '14px',
                              color: '#666',
                              lineHeight: '1.5',
                            }}
                          >
                            Implementiamo filtri predittivi multi-livello che
                            considerano non solo l'usura meccanica, ma anche
                            fattori ambientali, storici e di utilizzo per una
                            valutazione olistica.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: '#666',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <Wrench size={48} color='#ddd' />
            </div>
            <p style={{ margin: '0 0 20px' }}>
              Clicca su "Genera Rapporto Completo" per visualizzare l'analisi di
              manutenzione predittiva
            </p>
          </div>
        )}
      </Card>
    </Container>
  );
};

// Add global animation styles
// This could be moved to a separate CSS file
const GlobalStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .spin {
    animation: spin 1s linear infinite;
  }
`;

// Add the style to the document when the component mounts
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = GlobalStyle;
  document.head.appendChild(styleElement);
}

export default PredictiveMaintenance;
