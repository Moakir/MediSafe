// 健康管理应用 - lmq & AI 协作开发
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import MedicationCalendar from "@/pages/MedicationCalendar";
import MedicationInventory from "@/pages/MedicationInventory";
import CheckupManagement from "@/pages/CheckupManagement";
import HealthConsultation from "@/pages/HealthConsultation";
import MedicalHistory from "@/pages/MedicalHistory";
import Profile from "@/pages/Profile";
import HealthData from "@/pages/HealthData";
import BottomNav from "@/components/BottomNav";
import { useState, useRef, useEffect } from "react";
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';

// 全局悬浮按钮组件 - 新粗野主义风格
function FloatingButton() {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // 处理点击事件，导航到健康咨询页面
  const handleClick = () => {
    navigate('/health-consultation');
  };
  
  return (
    <motion.div
      ref={buttonRef}
      className="fixed right-5 bottom-24 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '10px 10px 0 0 #000' }}
        whileTap={{ scale: 0.95, y: 3, boxShadow: '4px 4px 0 0 #000' }}
        onClick={handleClick}
        className="w-16 h-16 rounded-[2px] border-[3px] border-black bg-[#67E8F9] flex items-center justify-center shadow-[6px_6px_0_0_#000] relative"
      >
        <MessageSquareText className="h-8 w-8" />
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#F87171] border border-black flex items-center justify-center text-xs font-bold">
          AI
        </span>
      </motion.button>
      
      {/* 标签 */}
      <motion.div 
        className="mt-2 bg-black text-white text-xs font-bold uppercase px-3 py-1 w-fit ml-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        健康咨询
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认为已登录状态，便于展示功能

  const logout = () => {
    setIsAuthenticated(false);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, login }}
    >
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medication-calendar" element={<MedicationCalendar />} />
          <Route path="/medication-inventory" element={<MedicationInventory />} />
          <Route path="/checkup-management" element={<CheckupManagement />} />
          <Route path="/health-consultation" element={<HealthConsultation />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/health-data" element={<HealthData />} />
        </Routes>
        
        {/* 全局悬浮按钮 */}
        {isAuthenticated && <FloatingButton />}
        
         {/* 底部导航菜单 - 健康咨询页面不显示 */}
         {isAuthenticated && window.location.pathname !== '/health-consultation' && <BottomNav />}
      </div>
    </AuthContext.Provider>
  );
}
