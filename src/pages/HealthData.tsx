import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Activity, Droplet, Thermometer, BarChart3, PlusCircle, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// 健康数据类型定义
interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: 'blue' | 'red' | 'amber' | 'green';
}

// 图表数据类型定义
interface ChartData {
  date: string;
  value: number;
}

// 健康记录类型定义
interface HealthRecord {
  id: string;
  type: 'bloodPressure' | 'heartRate' | 'bloodSugar' | 'bodyTemp';
  value: string;
  unit: string;
  date: string;
  time: string;
  notes?: string;
}

// 导航按钮组件 - 新粗野主义风格
interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center gap-1 py-2 px-2`}
      onClick={onClick}
    >
      <span className={`text-xl ${isActive ? 'text-[#67E8F9] border-b-2 border-[#67E8F9]' : 'text-gray-500'}`}>
        {icon}
      </span>
      <span className={`text-xs font-bold uppercase ${isActive ? 'text-[#67E8F9]' : 'text-gray-500'}`}>
        {label}
      </span>
    </motion.button>
  );
}

export default function HealthData() {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  
  // 当前选中的健康指标类型
  const [selectedMetric, setSelectedMetric] = useState<'bloodPressure' | 'heartRate' | 'bloodSugar' | 'bodyTemp'>('bloodPressure');
  
  // 健康指标数据
  const [healthMetrics] = useState<HealthMetric[]>([
    { 
      id: '1', 
      name: '血压', 
      value: '120/80', 
      unit: 'mmHg', 
      trend: 'stable', 
      icon: <Heart className="h-5 w-5" />,
      color: 'blue'
    },
    { 
      id: '2', 
      name: '心率', 
      value: '72', 
      unit: 'bpm', 
      trend: 'stable', 
      icon: <Activity className="h-5 w-5" />,
      color: 'red'
    },
    { 
      id: '3', 
      name: '血糖', 
      value: '5.2', 
      unit: 'mmol/L', 
      trend: 'down', 
      icon: <Droplet className="h-5 w-5" />,
      color: 'amber'
    },
    { 
      id: '4', 
      name: '体温', 
      value: '36.5', 
      unit: '°C', 
      trend: 'stable', 
      icon: <Thermometer className="h-5 w-5" />,
      color: 'green'
    }
  ]);
  
  // 模拟血压图表数据
  const [bloodPressureData] = useState<ChartData[]>([
    { date: '10/16', value: 118 },
    { date: '10/17', value: 122 },
    { date: '10/18', value: 120 },
    { date: '10/19', value: 125 },
    { date: '10/20', value: 121 },
    { date: '10/21', value: 119 },
    { date: '10/22', value: 120 }
  ]);
  
  // 模拟心率图表数据
  const [heartRateData] = useState<ChartData[]>([
    { date: '10/16', value: 70 },
    { date: '10/17', value: 75 },
    { date: '10/18', value: 72 },
    { date: '10/19', value: 78 },
    { date: '10/20', value: 73 },
    { date: '10/21', value: 71 },
    { date: '10/22', value: 72 }
  ]);
  
  // 模拟血糖图表数据
  const [bloodSugarData] = useState<ChartData[]>([
    { date: '10/16', value: 5.5 },
    { date: '10/17', value: 5.8 },
    { date: '10/18', value: 5.4 },
    { date: '10/19', value: 5.6 },
    { date: '10/20', value: 5.3 },
    { date: '10/21', value: 5.2 },
    { date: '10/22', value: 5.2 }
  ]);
  
  // 健康记录数据
  const [healthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      type: 'bloodPressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2025-10-22',
      time: '08:30'
    },
    {
      id: '2',
      type: 'heartRate',
      value: '72',
      unit: 'bpm',
      date: '2025-10-22',
      time: '08:30'
    },
    {
      id: '3',
      type: 'bloodSugar',
      value: '5.2',
      unit: 'mmol/L',
      date: '2025-10-22',
      time: '08:30',
      notes: '空腹'
    },
    {
      id: '4',
      type: 'bodyTemp',
      value: '36.5',
      unit: '°C',
      date: '2025-10-22',
      time: '08:30'
    },
    {
      id: '5',
      type: 'bloodPressure',
      value: '118/78',
      unit: 'mmHg',
      date: '2025-10-21',
      time: '18:00'
    }
  ]);
  
  // 获取颜色对应的背景色
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-[#67E8F9]',
      red: 'bg-[#F87171]',
      amber: 'bg-[#FFE066]',
      green: 'bg-[#86EFAC]'
    };
    return colorMap[color] || 'bg-gray-200';
  };
  
  // 获取当前选中指标的数据
  const getSelectedChartData = () => {
    switch(selectedMetric) {
      case 'heartRate':
        return heartRateData;
      case 'bloodSugar':
        return bloodSugarData;
      default:
        return bloodPressureData;
    }
  };
  
  // 获取指标名称
  const getMetricName = (type: string) => {
    switch(type) {
      case 'bloodPressure':
        return '血压';
      case 'heartRate':
        return '心率';
      case 'bloodSugar':
        return '血糖';
      case 'bodyTemp':
        return '体温';
      default:
        return '';
    }
  };
  
  // 获取指标图标
  const getMetricIcon = (type: string) => {
    switch(type) {
      case 'bloodPressure':
        return <Heart className="h-5 w-5" />;
      case 'heartRate':
        return <Activity className="h-5 w-5" />;
      case 'bloodSugar':
        return <Droplet className="h-5 w-5" />;
      case 'bodyTemp':
        return <Thermometer className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  // 导航到首页
  const navigateToHome = () => {
    navigate('/');
  };
  
  // 添加健康记录
  const handleAddRecord = () => {
    alert('添加健康记录功能开发中');
  };
  
  // 导航到其他功能页面
  const navigateToPage = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="min-h-screen pb-24 bg-white text-black">
      {/* 顶部导航栏 - 新粗野主义风格 */}
      <header className="sticky top-0 z-10 bg-white border-b-[3px] border-black px-4 py-4 flex justify-between items-center shadow-[0_4px_0_0_#000]">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            onClick={navigateToHome}
            className="p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#67E8F9] border-2 border-black flex items-center justify-center">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">健康数据</h1>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95, y: 2 }}
          onClick={handleAddRecord}
          className="px-4 py-2 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
        >
          <PlusCircle className="h-4 w-4 inline mr-1" /> 添加
        </motion.button>
      </header>
      
      {/* 内容区域 */}
      <main className="px-4 py-6 space-y-8">
        {/* 健康指标卡片 - 新粗野主义风格 */}
        <motion.div 
          className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {healthMetrics.map((metric) => (
              <motion.div 
                key={metric.id}
                className="p-4 border-2 border-black bg-white shadow-[3px_3px_0_0_#000]"
                whileHover={{ scale: 1.02, y: -2, boxShadow: '5px 5px 0 0 #000' }}
                whileTap={{ scale: 0.98, y: 0, boxShadow: '2px 2px 0 0 #000' }}
              >
                <div className={`w-12 h-12 flex items-center justify-center border-2 border-black ${getColorClass(metric.color)} mb-3`}>
                  {metric.icon}
                </div>
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-2xl font-black digital">{metric.value}</span>
                  <span className="text-sm font-bold">{metric.unit}</span>
                </div>
                <div className="flex items-center justify-center mt-2">
                  {metric.trend === 'up' && (
                    <span className="text-xs font-bold flex items-center bg-[#FEE2E2] px-2 py-1 border border-black rounded-[2px]">
                      <i className="fa-solid fa-arrow-up mr-1"></i> 上升
                    </span>
                  )}
                  {metric.trend === 'down' && (
                    <span className="text-xs font-bold flex items-center bg-[#DCFCE7] px-2 py-1 border border-black rounded-[2px]">
                      <i className="fa-solid fa-arrow-down mr-1"></i> 下降
                    </span>
                  )}
                  {metric.trend === 'stable' && (
                    <span className="text-xs font-bold flex items-center bg-[#E0F2FE] px-2 py-1 border border-black rounded-[2px]">
                      <i className="fa-solid fa-minus mr-1"></i> 稳定
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* 健康图表 - 新粗野主义风格 */}
        <motion.div 
          className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black uppercase tracking-tight">健康趋势</h3>
            <div className="flex gap-2">
              {['bloodPressure', 'heartRate', 'bloodSugar'].map((type) => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.95, y: 2 }}
                  onClick={() => setSelectedMetric(type as any)}
                  className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black ${
                    selectedMetric === type 
                      ? 'bg-[#67E8F9] text-black shadow-[2px_2px_0_0_#000]' 
                      : 'bg-white text-black'
                  }`}
                >
                  {getMetricName(type)}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="h-64 border-2 border-black">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'bloodPressure' ? (
                <AreaChart data={getSelectedChartData()}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#67E8F9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#67E8F9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    stroke="#000"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    stroke="#000"
                    domain={[100, 140]}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.2} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      borderColor: '#000',
                      borderRadius: '2px',
                      borderWidth: '2px',
                      color: '#000',
                      fontWeight: 'bold'
                    }}
                    formatter={(value: any) => [`${value}/80 mmHg`, '血压']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#000" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              ) : selectedMetric === 'heartRate' ? (
                <LineChart data={getSelectedChartData()}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    stroke="#000"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    stroke="#000"
                    domain={[60, 90]}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.2} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      borderColor: '#000',
                      borderRadius: '2px',
                      borderWidth: '2px',
                      color: '#000',
                      fontWeight: 'bold'
                    }}
                    formatter={(value: any) => [`${value} bpm`, '心率']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#000" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: '#F87171' }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: '#F87171' }}
                  />
                </LineChart>
              ) : (
                <BarChart data={getSelectedChartData()}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    stroke="#000"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    stroke="#000"
                    domain={[4, 7]}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.2} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      borderColor: '#000',
                      borderRadius: '2px',
                      borderWidth: '2px',
                      color: '#000',
                      fontWeight: 'bold'
                    }}
                    formatter={(value: any) => [`${value} mmol/L`, '血糖']}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#FFE066" 
                    stroke="#000"
                    strokeWidth={1}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex justify-center">
            <motion.div
              whileHover={{ y: -2, boxShadow: '4px 4px 0 0 #000' }}
              className="text-xs px-4 py-2 bg-[#e5e7eb] border-2 border-black font-bold uppercase"
            >
              最近7天数据趋势
            </motion.div>
          </div>
        </motion.div>
        
        {/* 健康记录 - 新粗野主义风格 */}
        <motion.div 
          className="border-[3px] border-black bg-white overflow-hidden shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="p-4 border-b-2 border-black bg-[#67E8F9]">
            <h3 className="text-xl font-black uppercase tracking-tight">健康记录</h3>
          </div>
          
          <div className="divide-y-2 divide-black">
            {healthRecords.map((record) => {
              // 根据记录类型确定颜色
              let recordColor = '';
              switch(record.type) {
                case 'bloodPressure': recordColor = 'bg-[#67E8F9]'; break;
                case 'heartRate': recordColor = 'bg-[#F87171]'; break;
                case 'bloodSugar': recordColor = 'bg-[#FFE066]'; break;
                case 'bodyTemp': recordColor = 'bg-[#86EFAC]'; break;
              }
              
              return (
                <motion.div
                  key={record.id}
                  className="p-4"
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 flex items-center justify-center border-2 border-black ${recordColor}`}>
                        {getMetricIcon(record.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg">{getMetricName(record.type)}</h4>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-black digital">{record.value}</span>
                          <span className="text-sm font-bold">{record.unit}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 border border-black bg-white px-2 py-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-sm font-bold">{formatDate(record.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 border border-black bg-white px-2 py-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-sm font-bold">{record.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {record.notes && (
                    <motion.div 
                      className="mt-3 p-2 border-2 border-black bg-[#e5e7eb]"
                      whileHover={{ scale: 1.01 }}
                    >
                      <span className="text-xs font-bold">{record.notes}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
      
      {/* 移除页面底部的空白区域，由全局的底部导航栏负责 */}
    </div>
  );
}