// 底部导航组件 - lmq & AI 协作开发
// 新粗野主义风格的底部导航组件
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, CalendarCheck, CalendarDays, BarChart3, User } from 'lucide-react';

// 菜单项类型定义
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 菜单项配置
  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: '首页',
      icon: <Home className="h-6 w-6" />,
      path: '/'
    },
    {
      id: 'medication',
      label: '用药',
      icon: <CalendarCheck className="h-6 w-6" />,
      path: '/medication-calendar'
    },
    {
      id: 'checkup',
      label: '复查',
      icon: <CalendarDays className="h-6 w-6" />,
      path: '/checkup-management'
    },
    {
      id: 'health',
      label: '健康',
      icon: <BarChart3 className="h-6 w-6" />,
      path: '/health-data'
    },
    {
      id: 'profile',
      label: '我的',
      icon: <User className="h-6 w-6" />,
      path: '/profile'
    }
  ];
  
  // 处理导航
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-black shadow-[0_-4px_0_0_#000] z-30"
    >
      <div className="flex justify-around items-center h-20">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center gap-1 p-2 ${
                isActive 
                  ? 'text-[#67E8F9]' 
                  : 'text-black'
              }`}
              onClick={() => handleNavigate(item.path)}
            >
               <div className={`p-2 border-2 ${
                  isActive 
                    ? 'border-[#67E8F9] bg-[#67E8F9] text-black shadow-[3px_3px_0_0_#000]' 
                    : 'border-black bg-white'
                }`}>
                  {item.icon}
                </div>
              <span className={`text-xs font-bold uppercase ${
                isActive ? 'text-[#67E8F9]' : 'text-black'
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}