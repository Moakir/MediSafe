// 新粗野主义风格的个人中心页面
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Heart, Pill, FileText, Settings, LogOut, Bell, MessageSquare, HelpCircle, Info, Shield, UserPlus, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import avatarImage from '@/assets/avatar.png';

// 编辑图标组件
const Edit = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 6a2 2 0 0 1 2 2v10" />
      <path d="M10 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <path d="m18.4 7.6-4.4 4.4" />
      <path d="m14 14 4.4 4.4" />
      <path d="m14 14-4.4 4.4" />
      <path d="m14 14 4.4-4.4" />
    </svg>
  );
};

// 新粗野主义风格的健康卡片组件
interface HealthCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'yellow' | 'green' | 'red';
  onClick: () => void;
}

function HealthCard({ title, value, icon, color, onClick }: HealthCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'bg-[#67E8F9]',
    yellow: 'bg-[#FFE066]',
    green: 'bg-[#86EFAC]',
    red: 'bg-[#F87171]'
  };
  
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '5px 5px 0 0 #000' }}
      whileTap={{ y: 0, boxShadow: '2px 2px 0 0 #000' }}
      onClick={onClick}
      className={`flex flex-col items-center p-3 border-2 border-black bg-white shadow-[3px_3px_0_0_#000]`}
    >
      <div className={`w-10 h-10 flex items-center justify-center border-2 border-black ${colorMap[color]} mb-2`}>
        {icon}
      </div>
      <span className="text-xl font-black digital">{value}</span><span className="text-xs font-bold uppercase mt-1">{title}</span>
    </motion.div>
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

export default function Profile() {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const { logout } = useContext(AuthContext);
  
  // 用户信息
  const [userInfo] = useState({
    name: '张先生',
    age: 35,
    gender: '男',
    avatar: avatarImage
  });
  
  // 健康数据统计
  const [healthStats] = useState({
    medicationReminders: 3,
    upcomingCheckups: 2,
    completedVisits: 4,
    inventoryItems: 5
  });
  
  // 处理退出登录
  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      logout();
      // 在实际应用中，这里应该跳转到登录页面
      alert('已退出登录');
    }
  };
  
  // 导航到首页
  const navigateToHome = () => {
    navigate('/');
  };
  
  // 导航到设置页面
  const navigateToSettings = () => {
    alert('设置页面开发中');
  };
  
  // 导航到帮助页面
  const navigateToHelp = () => {
    alert('帮助页面开发中');
  };
  
  // 导航到关于页面
  const navigateToAbout = () => {
    alert('关于页面开发中');
  };
  
  // 导航到个人信息编辑页面
  const navigateToEditProfile = () => {
    alert('编辑个人信息页面开发中');
  };
  
  // 导航到医疗记录页面
  const navigateToMedicalHistory = () => {
    navigate('/medical-history');
  };
  
  // 导航到用药提醒页面
  const navigateToMedicationCalendar = () => {
    navigate('/medication-calendar');
  };
  
  // 导航到复查管理页面
  const navigateToCheckupManagement = () => {
    navigate('/checkup-management');
  };
  
  // 导航到药物库存页面
  const navigateToMedicationInventory = () => {
    navigate('/medication-inventory');
  };
  
  // 导航到健康咨询页面
  const navigateToHealthConsultation = () => {
    navigate('/health-consultation');
  };
  
  // 导航到通知页面
  const navigateToNotifications = () => {
    alert('通知页面开发中');
  };
  
  // 功能菜单项
  const menuItems = [
    {
      title: '用药日历',
      icon: <Pill className="h-5 w-5" />,
      onClick: navigateToMedicationCalendar,
      badge: healthStats.medicationReminders > 0 ? healthStats.medicationReminders.toString() : undefined
    },
    {
      title: '复查管理',
      icon: <CalendarDays className="h-5 w-5" />,
      onClick: navigateToCheckupManagement,
      badge: healthStats.upcomingCheckups > 0 ? healthStats.upcomingCheckups.toString() : undefined
    },
    {
      title: '药物库存',
      icon: <Pill className="h-5 w-5" />,
      onClick: navigateToMedicationInventory
    },
    {
      title: '门诊历史',
      icon: <FileText className="h-5 w-5" />,
      onClick: navigateToMedicalHistory
    },
    {
      title: '健康咨询',
      icon: <MessageSquare className="h-5 w-5" />,
      onClick: navigateToHealthConsultation
    },
    {
      title: '通知中心',
      icon: <Bell className="h-5 w-5" />,
      onClick: navigateToNotifications,
      badge: '2'
    },
    {
      title: '设置',
      icon: <Settings className="h-5 w-5" />,
      onClick: navigateToSettings
    },
    {
      title: '帮助与反馈',
      icon: <HelpCircle className="h-5 w-5" />,
      onClick: navigateToHelp
    },
    {
      title: '关于我们',
      icon: <Info className="h-5 w-5" />,
      onClick: navigateToAbout
    },
    {
      title: '隐私政策',
      icon: <Shield className="h-5 w-5" />,
      onClick: () => alert('隐私政策页面开发中')
    }
  ];
  
  // 健康卡片
  const healthCards = [
    {
      title: '用药提醒',
      value: healthStats.medicationReminders,
      icon: <Pill className="h-5 w-5" />,
      color: 'blue',
      onClick: navigateToMedicationCalendar
    },
    {
      title: '即将复查',
      value: healthStats.upcomingCheckups,
      icon: <CalendarDays className="h-5 w-5" />,
      color: 'yellow',
      onClick: navigateToCheckupManagement
    },
    {
      title: '就诊记录',
      value: healthStats.completedVisits,
      icon: <FileText className="h-5 w-5" />,
      color: 'green',
      onClick: navigateToMedicalHistory
    },
    {
      title: '药物库存',
      value: healthStats.inventoryItems,
      icon: <Pill className="h-5 w-5" />,
      color: 'red',
      onClick: navigateToMedicationInventory
    }
  ];
  
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
          <h1 className="text-2xl font-black uppercase tracking-tighter">个人中心</h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.95, y: 2 }}
          onClick={toggleTheme}
          className="p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
        >
          <i className="fa-solid fa-moon text-black"></i>
        </motion.button>
      </header>
      
      {/* 内容区域 */}
      <main className="px-4 py-6 space-y-8">
        {/* 用户信息卡片 */}
        <motion.div 
          className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-20 h-20 border-[3px] border-black overflow-hidden">
                  <img 
                    src={userInfo.avatar} 
                    alt="用户头像" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#67E8F9] border-2 border-black flex items-center justify-center"
                  onClick={navigateToEditProfile}
                >
                  <UserPlus className="h-4 w-4" />
                </motion.div>
              </motion.div>
              <div>
                <h2 className="text-xl font-black">{userInfo.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold">{userInfo.age}岁 · {userInfo.gender}</span>
                  <motion.button
                    whileTap={{ scale: 0.95, y: 2 }}
                    onClick={navigateToEditProfile}
                    className="text-xs px-3 py-1 bg-white border-2 border-black font-bold uppercase shadow-[2px_2px_0_0_#000]"
                  >
                    <Edit className="h-3 w-3 inline mr-1" /> 编辑
                  </motion.button>
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-[#F87171] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
            >
              <LogOut className="h-4 w-4 inline mr-1" /> 退出
            </motion.button>
          </div>
          
          {/* 健康数据统计 */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {healthCards.map((card, index) => (
              <HealthCard 
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                onClick={card.onClick}
              />
            ))}
          </div>
        </motion.div>
        
        {/* 功能菜单 */}
        <motion.div 
          className="border-[3px] border-black bg-white overflow-hidden shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="divide-y divide-black">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98, backgroundColor: '#e5e7eb' }}
                onClick={item.onClick}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#67E8F9] border-2 border-black flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold">{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-1 bg-[#F87171] text-black font-bold text-xs border border-black">
                      {item.badge}
                    </span>
                  )}
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* 应用版本信息 */}
        <div className="text-center py-2">
          <p className="text-xs font-bold uppercase">
            用药小助手 v1.0.0
          </p>
        </div>
      </main>
      
      {/* 移除页面底部的空白区域，由全局的底部导航栏负责 */}
    </div>
  );
}