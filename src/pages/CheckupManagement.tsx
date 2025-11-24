// 状态筛选按钮组件 - 新粗野主义风格
interface StatusFilterButtonProps {
  label: string;
  isActive: boolean;
  color?: 'blue' | 'green' | 'red';
  onClick: () => void;
}

function StatusFilterButton({ label, isActive, color, onClick }: StatusFilterButtonProps) {
  const baseClasses = `px-3 py-1.5 text-xs font-bold uppercase border-2 border-black`;
  const activeClasses = {
    blue: 'bg-[#67E8F9] text-black shadow-[3px_3px_0_0_#000]',
    green: 'bg-[#86EFAC] text-black shadow-[3px_3px_0_0_#000]',
    red: 'bg-[#F87171] text-black shadow-[3px_3px_0_0_#000]',
    default: 'bg-[#67E8F9] text-black shadow-[3px_3px_0_0_#000]',
  };
  const inactiveClasses = 'bg-white text-black';
  
  const getActiveClass = () => {
    if (color) return activeClasses[color];
    return activeClasses.default;
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 2 }}
      className={`${baseClasses} ${isActive ? getActiveClass() : inactiveClasses}`}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
}

// 统计卡片组件 - 新粗野主义风格
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'red';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'bg-[#67E8F9]',
    green: 'bg-[#86EFAC]',
    red: 'bg-[#F87171]'
  };
  
  const bgColor = colorMap[color || 'blue'];
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2, boxShadow: '5px 5px 0 0 #000' }}
      className="p-3 border-2 border-black bg-white shadow-[3px_3px_0_0_#000]"
    >
      <div className="flex items-center gap-1.5">
        <div className={`p-1.5 border border-black ${bgColor}`}>
          {icon}
        </div>
        <span className="text-xs font-bold uppercase">{title}</span>
      </div>
      <div className="mt-1 flex items-baseline">
        <span className="text-xl font-black digital">{value}</span>
      </div>
    </motion.div>
  );
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CalendarDays, FileText, AlertCircle, Edit, Trash2, CalendarCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// 复查类型定义
interface Checkup {
  id: string;
  doctor: string;
  department: string;
  hospital: string;
  date: string;
  time: string;
  purpose: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'missed';
  reminderStatus: 'enabled' | 'disabled';
}

export default function CheckupManagement() {
  const navigate = useNavigate();
  
  // 模拟复查数据
  const [checkups, setCheckups] = useState<Checkup[]>([
    {
      id: '1',
      doctor: '张医生',
      department: '内科',
      hospital: '市第一医院',
      date: '2025-10-28',
      time: '10:00',
      purpose: '高血压复诊',
      notes: '记得带上之前的检查报告',
      status: 'upcoming',
      reminderStatus: 'enabled'
    },
    {
      id: '2',
      doctor: '李医生',
      department: '眼科',
      hospital: '市眼科医院',
      date: '2025-10-25',
      time: '14:30',
      purpose: '视力检查',
      status: 'upcoming',
      reminderStatus: 'disabled'
    },
    {
      id: '3',
      doctor: '王医生',
      department: '骨科',
      hospital: '省立医院',
      date: '2025-10-20',
      time: '09:15',
      purpose: '膝盖复查',
      notes: '需要拍X光片',
      status: 'completed',
      reminderStatus: 'disabled'
    },
    {
      id: '4',
      doctor: '刘医生',
      department: '口腔科',
      hospital: '口腔医院',
      date: '2025-10-18',
      time: '16:00',
      purpose: '洗牙',
      status: 'missed',
      reminderStatus: 'disabled'
    }
  ]);
  
  // 筛选状态
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed' | 'missed'>('all');
  
  // 处理状态筛选
  const handleStatusFilter = (status: 'all' | 'upcoming' | 'completed' | 'missed') => {
    setStatusFilter(status);
  };
  
  // 过滤复查列表
  const filteredCheckups = checkups.filter(checkup => {
    return statusFilter === 'all' || checkup.status === statusFilter;
  });
  
  // 处理添加复查
  const handleAddCheckup = () => {
    // 实际项目中应该导航到添加页面，这里先使用toast提示
    alert('添加复查功能开发中');
  };
  
  // 处理编辑复查
  const handleEditCheckup = (id: string) => {
    // 实际项目中应该导航到编辑页面，这里先使用toast提示
    alert(`编辑复查ID: ${id}`);
  };
  
  // 处理删除复查
  const handleDeleteCheckup = (id: string) => {
    if (window.confirm('确定要删除这个复查记录吗？')) {
      setCheckups(prevCheckups => 
        prevCheckups.filter(checkup => checkup.id !== id)
      );
    }
  };
  
  // 处理切换提醒状态
  const handleToggleReminder = (id: string) => {
    setCheckups(prevCheckups => 
      prevCheckups.map(checkup => 
        checkup.id === id 
          ? { ...checkup, reminderStatus: checkup.reminderStatus === 'enabled' ? 'disabled' : 'enabled' } 
          : checkup
      )
    );
  };
  
  // 处理标记为已完成
  const handleMarkAsCompleted = (id: string) => {
    setCheckups(prevCheckups => 
      prevCheckups.map(checkup => 
        checkup.id === id 
          ? { ...checkup, status: 'completed' } 
          : checkup
      )
    );
  };
  
  // 导航到首页
  const navigateToHome = () => {
    navigate('/');
  };
  
  // 获取复查状态标签
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'upcoming':
        return '即将到来';
      case 'completed':
        return '已完成';
      case 'missed':
        return '已错过';
      default:
        return '未知';
    }
  };
  
  // 获取复查状态颜色
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'bg-[#67E8F9]';
      case 'completed':
        return 'bg-[#86EFAC]';
      case 'missed':
        return 'bg-[#F87171]';
      default:
        return 'bg-gray-200';
    }
  };
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  // 计算距离复查的天数
  const getDaysUntilCheckup = (dateString: string) => {
    const today = new Date();
    const checkupDate = new Date(dateString);
    const diffTime = checkupDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <div className="w-10 h-10 bg-[#FFE066] border-2 border-black flex items-center justify-center">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">复查管理</h1>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95, y: 2 }}
          onClick={handleAddCheckup}
          className="px-4 py-2 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
        >
          <Plus className="h-4 w-4 inline mr-1" /> 添加
        </motion.button>
      </header>
      
      {/* 内容区域 */}
      <main className="px-4 py-6 space-y-8">
        {/* 状态筛选 */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          <StatusFilterButton 
            label="全部" 
            isActive={statusFilter === 'all'} 
            onClick={() => handleStatusFilter('all')}
          />
          <StatusFilterButton 
            label="即将到来" 
            isActive={statusFilter === 'upcoming'} 
            color="blue"
            onClick={() => handleStatusFilter('upcoming')}
          />
          <StatusFilterButton 
            label="已完成" 
            isActive={statusFilter === 'completed'} 
            color="green"
            onClick={() => handleStatusFilter('completed')}
          />
          <StatusFilterButton 
            label="已错过" 
            isActive={statusFilter === 'missed'} 
            color="red"
            onClick={() => handleStatusFilter('missed')}
          />
        </div>
        
        {/* 复查列表 - 新粗野主义风格 */}
        <motion.div 
          className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredCheckups.length > 0 ? (
            <div className="divide-y-2 divide-black">
              {filteredCheckups.map((checkup) => {
                const daysUntil = checkup.status === 'upcoming' ? getDaysUntilCheckup(checkup.date) : null;
                const isUrgent = checkup.status === 'upcoming' && daysUntil !== null && daysUntil <= 3;
                
                // 根据状态确定背景色
                let bgColor = '';
                switch(checkup.status) {
                  case 'upcoming': 
                    bgColor = isUrgent ? 'bg-[#E0F2FE]' : ''; 
                    break;
                  case 'completed': 
                    bgColor = 'bg-[#DCFCE7]'; 
                    break;
                  case 'missed': 
                    bgColor = 'bg-[#FEE2E2]'; 
                    break;
                }
                
                return (
                  <motion.div
                    key={checkup.id}
                    className={`p-4 ${bgColor}`}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-lg">{checkup.doctor}</h4>
                          <span className={`text-xs px-3 py-1 font-bold uppercase border-2 border-black ${getStatusColor(checkup.status)}`}>
                            {getStatusLabel(checkup.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-bold">{checkup.department} · {checkup.hospital}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {checkup.status === 'upcoming' && (
                          <motion.button
                            whileTap={{ scale: 0.9, y: 1 }}
                            onClick={() => handleToggleReminder(checkup.id)}
                            className={`p-2 border-2 border-black ${
                              checkup.reminderStatus === 'enabled'
                                ? 'bg-[#67E8F9] text-black shadow-[2px_2px_0_0_#000]'
                                : 'bg-white text-black'
                            }`}
                          >
                            <i className={`fa-solid ${checkup.reminderStatus === 'enabled' ? 'fa-bell' : 'fa-bell-slash'}`}></i>
                          </motion.button>
                        )}
                        <motion.button
                          whileTap={{ scale: 0.9, y: 1 }}
                          onClick={() => handleEditCheckup(checkup.id)}
                          className="p-2 bg-white border-2 border-black shadow-[2px_2px_0_0_#000]"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9, y: 1 }}
                          onClick={() => handleDeleteCheckup(checkup.id)}
                          className="p-2 bg-white border-2 border-black shadow-[2px_2px_0_0_#000]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 bg-white border-2 border-black">
                        <CalendarDays className="h-5 w-5" />
                        <div>
                          <span className="text-xs font-bold block">日期</span>
                          <span className="text-sm font-medium">{formatDate(checkup.date)}</span>
                          {checkup.status === 'upcoming' && daysUntil !== null && (
                            <span className={`text-xs ml-2 font-bold ${
                              daysUntil <= 0 
                                ? 'bg-[#F87171] px-1' 
                                : isUrgent 
                                  ? 'bg-[#67E8F9] px-1'
                                  : ''
                            }`}>
                              {daysUntil <= 0 ? '今天' : `${daysUntil}天后`}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white border-2 border-black">
                        <Clock className="h-5 w-5" />
                        <div>
                          <span className="text-xs font-bold block">时间</span>
                          <span className="text-sm font-medium">{checkup.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-white border-2 border-black">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <div>
                          <span className="text-xs font-bold block">目的</span><span className="text-sm">{checkup.purpose}</span>
                        </div>
                      </div>
                    </div>
                    
                    {checkup.notes && (
                      <motion.div 
                        className="mt-4 p-3 bg-[#FFE066] border-2 border-black"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 mt-0.5" />
                          <span className="text-sm font-bold">{checkup.notes}</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {checkup.status === 'upcoming' && (
                      <div className="mt-4">
                        <motion.button
                          whileTap={{ scale: 0.95, y: 2 }}
                          onClick={() => handleMarkAsCompleted(checkup.id)}
                          className="w-full py-3 bg-[#86EFAC] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
                        >
                          <CalendarCheck className="h-5 w-5 inline mr-1" /> 标记为已完成
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="h-16 w-16 mb-6 text-[#e5e7eb]" />
              <p className="text-base font-bold uppercase">没有找到复查记录</p>
              <motion.button
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={handleAddCheckup}
                className="mt-6 px-6 py-3 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
              >
                添加复查记录
              </motion.button>
            </div>
          )}
        </motion.div>
        
        {/* 复查统计 */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard 
            title="总复查数" 
            value={checkups.length.toString()} 
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard 
            title="即将到来" 
            value={checkups.filter(c => c.status === 'upcoming').length.toString()} 
            icon={<CalendarDays className="h-4 w-4" />}
            color="blue"
          />
          <StatCard 
            title="已错过" 
            value={checkups.filter(c => c.status === 'missed').length.toString()} 
            icon={<AlertCircle className="h-4 w-4" />}
            color="red"
          />
        </div>
      </main>
    </div>
  );
}