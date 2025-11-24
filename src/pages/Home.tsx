// 健康管理应用首页 - lmq & AI 协作开发
// 新粗野主义风格的功能按钮组件
interface FeatureButtonProps {
  icon: React.ReactNode;
  label: string;
  color: 'yellow' | 'blue' | 'green' | 'red';
  onClick: () => void;
}

function FeatureButton({ icon, label, color, onClick }: FeatureButtonProps) {
  const colorMap: Record<string, string> = {
    yellow: 'bg-[#FFE066] text-black',
    blue: 'bg-[#67E8F9] text-black',
    green: 'bg-[#86EFAC] text-black',
    red: 'bg-[#F87171] text-black',
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 2, boxShadow: '4px 4px 0 0 #000' }}
      className={`flex flex-col items-center gap-2 p-3 border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]`}
      onClick={onClick}
    >
      <div className={`w-12 h-12 flex items-center justify-center border-2 border-black ${colorMap[color]} rounded-[2px]`}>
        {icon}
      </div>
      <span className="text-xs font-bold uppercase">{label}</span>
    </motion.button>
  );
}

// 新粗野主义风格的导航按钮组件
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

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, CalendarCheck, CalendarDays, Pill, FileText, Stethoscope, MessageSquareText } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { brutalStyle } from '../lib/utils';

// 用药提醒类型定义
interface MedicationReminder {
  id: string;
  name: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
  dosage: string;
}

// 健康数据类型定义
interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export default function Home() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // 模拟当前时间
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 模拟用药提醒数据
  const [reminders, setReminders] = useState<MedicationReminder[]>([
    { id: '1', name: '维生素C', time: '09:30', status: 'pending', dosage: '1片' },
    { id: '2', name: '钙片', time: '14:00', status: 'pending', dosage: '2片' },
    { id: '3', name: '胃药', time: '19:00', status: 'pending', dosage: '1粒' },
  ]);
  
  // 模拟健康数据
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { name: '血压', value: '120/80', unit: 'mmHg', trend: 'stable' },
    { name: '心率', value: '72', unit: 'bpm', trend: 'stable' },
    { name: '血糖', value: '5.2', unit: 'mmol/L', trend: 'down' },
  ]);
  
  // 模拟即将到来的复查
  const [upcomingCheckup, setUpcomingCheckup] = useState({
    id: '1',
    doctor: '张医生',
    department: '内科',
    date: '2025-10-28',
    time: '10:00',
    hospital: '市第一医院'
  });
  
  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 处理用药提醒标记为已服用
  const handleMarkAsTaken = (id: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => 
        reminder.id === id ? { ...reminder, status: 'taken' } : reminder
      )
    );
  };
  
  // 导航到各个功能页面
  const navigateToPage = (path: string) => {
    navigate(path);
  };
  
  // 获取格式化的当前时间
  const formattedDate = `${currentTime.getFullYear()}年${currentTime.getMonth() + 1}月${currentTime.getDate()}日`;
  const formattedDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currentTime.getDay()];
  
  return (
    <div className="min-h-screen pb-24 bg-white text-black">
      {/* 顶部导航栏 - 新粗野主义风格 */}
      <header className="sticky top-0 z-10 bg-white border-b-[3px] border-black px-4 py-4 flex justify-between items-center shadow-[0_4px_0_0_#000]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#67E8F9] border-2 border-black flex items-center justify-center">
            <Pill className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">用药小助手</h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.95, y: 2 }}
          className="relative p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F87171] border border-black flex items-center justify-center text-[10px] font-bold">
            2
          </span>
        </motion.button>
      </header>
      
      {/* 内容区域 */}
      <main className="px-4 py-6 space-y-8">
        {/* 日期头部 */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight">{formattedDate}</h2>
            <p className="text-sm font-bold uppercase">{formattedDay}</p>
          </div>
        </div>
        
        {/* 用药提醒卡片 */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black uppercase tracking-tight">今日用药提醒</h3>
            <button 
              onClick={() => navigateToPage('/medication-calendar')}
              className="text-sm font-bold uppercase flex items-center gap-2 border-2 border-black px-3 py-1 bg-white shadow-[3px_3px_0_0_#000]"
            >
              查看全部 <CalendarCheck className="h-4 w-4" />
            </button>
          </div>
          
          <div className="border-[3px] border-black bg-white p-4 space-y-4 shadow-[6px_6px_0_0_#000]">
            {reminders.map((reminder) => (
              <motion.div 
                key={reminder.id}
                className={`flex items-center justify-between p-4 border-2 border-black rounded-[2px] ${
                  reminder.status === 'pending' 
                    ? 'bg-[#E0F2FE]' 
                    : reminder.status === 'taken'
                    ? 'bg-[#DCFCE7]'
                    : 'bg-[#FEE2E2]'
                }`}
                whileHover={{ y: -2, boxShadow: '4px 4px 0 0 #000' }}
                whileTap={{ y: 0, boxShadow: '2px 2px 0 0 #000' }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center border-2 border-black rounded-[2px] ${
                    reminder.status === 'pending' 
                      ? 'bg-[#67E8F9]' 
                      : reminder.status === 'taken'
                      ? 'bg-[#86EFAC]'
                      : 'bg-[#F87171]'
                  }`}>
                    <Pill className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{reminder.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm font-bold digital">{reminder.time}</span>
                      <span className="text-xs px-2 py-1 border border-black bg-white font-bold rounded-[2px]">{reminder.dosage}</span>
                    </div>
                  </div>
                </div>
                
                {reminder.status === 'pending' && (
                  <motion.button
                    whileTap={{ scale: 0.95, y: 2 }}
                    onClick={() => handleMarkAsTaken(reminder.id)}
                    className="px-4 py-2 bg-[#67E8F9] text-black font-bold text-sm border-2 border-black shadow-[3px_3px_0_0_#000]"
                  >
                    已服用
                  </motion.button>
                )}
                
                {reminder.status === 'taken' && (
                  <span className="px-3 py-1 bg-[#86EFAC] text-black font-bold text-xs border-2 border-black rounded-[2px]">
                    已服用
                  </span>
                )}
                
                {reminder.status === 'missed' && (
                  <span className="px-3 py-1 bg-[#F87171] text-black font-bold text-xs border-2 border-black rounded-[2px]">
                    已错过
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* 健康指标卡片 */}
        <section>
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">健康指标</h3>
          <div className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#000]">
            <div className="grid grid-cols-3 gap-4">
              {healthMetrics.map((metric, index) => (
                <motion.div 
                  key={index}
                  className="p-4 border-2 border-black bg-white rounded-[2px] shadow-[3px_3px_0_0_#000]"
                  whileHover={{ y: -2, boxShadow: '5px 5px 0 0 #000' }}
                >
                  <span className="text-xs font-bold uppercase block">{metric.name}</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black digital">{metric.value}</span>
                    <span className="text-sm font-bold">{metric.unit}</span>
                  </div>
                  <div className="flex items-center mt-2">
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
          </div>
        </section>
        
        {/* 即将到来的复查 */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black uppercase tracking-tight">即将到来的复查</h3>
            <button 
              onClick={() => navigateToPage('/checkup-management')}
              className="text-sm font-bold uppercase flex items-center gap-2 border-2 border-black px-3 py-1 bg-white shadow-[3px_3px_0_0_#000]"
            >
              查看全部 <FileText className="h-4 w-4" />
            </button>
          </div>
          
          <motion.div 
            className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#000]"
            whileHover={{ y: -2, boxShadow: '8px 8px 0 0 #000' }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFE066] border-2 border-black flex items-center justify-center rounded-[2px]">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-lg">{upcomingCheckup.doctor}</h4>
                  <span className="px-2 py-1 bg-[#67E8F9] text-black font-bold text-xs border-2 border-black rounded-[2px]">
                    {upcomingCheckup.department}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 border border-black bg-white px-2 py-1 rounded-[2px]">
                    <i className="fa-solid fa-calendar text-sm"></i>
                    <span className="text-sm font-bold">{upcomingCheckup.date}</span>
                  </div>
                  <div className="flex items-center gap-1 border border-black bg-white px-2 py-1 rounded-[2px]">
                    <i className="fa-solid fa-clock text-sm"></i>
                    <span className="text-sm font-bold">{upcomingCheckup.time}</span>
                  </div>
                </div>
                <p className="text-sm font-bold mt-2">{upcomingCheckup.hospital}</p>
                
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.95, y: 2 }}
                    className="flex-1 py-2 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
                  >
                    添加提醒
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95, y: 2 }}
                    className="flex-1 py-2 bg-white text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
                  >
                    详情
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* 快速操作 */}
        <section>
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">快速操作</h3>
          <div className="grid grid-cols-4 gap-4">
            <FeatureButton 
              icon={<CalendarCheck className="h-6 w-6" />}
              label="用药日历"
              color="blue"
              onClick={() => navigateToPage('/medication-calendar')}
            />
            <FeatureButton 
              icon={<Pill className="h-6 w-6" />}
              label="药物库存"
              color="green"
              onClick={() => navigateToPage('/medication-inventory')}
            />
            <FeatureButton 
              icon={<CalendarDays className="h-6 w-6" />}
              label="复查管理"
              color="yellow"
              onClick={() => navigateToPage('/checkup-management')}
            />
            <FeatureButton 
              icon={<MessageSquareText className="h-6 w-6" />}
              label="健康咨询"
              color="red"
              onClick={() => navigateToPage('/health-consultation')}
            />
          </div>
        </section>
      </main>
      
      {/* 移除页面底部的空白区域，由全局的底部导航栏负责 */}
    </div>
  );
}