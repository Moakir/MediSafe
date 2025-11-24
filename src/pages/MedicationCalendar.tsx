import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, Plus, Pill, AlertTriangle, Check } from 'lucide-react';
import { motion } from 'framer-motion';

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

// 用药提醒类型定义
interface MedicationReminder {
  id: string;
  name: string;
  time: string;
  date: string;
  dosage: string;
  status: 'pending' | 'taken' | 'missed';
  notes?: string;
}

export default function MedicationCalendar() {
  const navigate = useNavigate();
  
  // 当前选中的日期
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // 模拟用药提醒数据
  const [reminders, setReminders] = useState<MedicationReminder[]>([
    { 
      id: '1', 
      name: '维生素C', 
      time: '09:30', 
      date: '2025-10-22', 
      dosage: '1片', 
      status: 'pending',
      notes: '随餐服用'
    },
    { 
      id: '2', 
      name: '钙片', 
      time: '14:00', 
      date: '2025-10-22', 
      dosage: '2片', 
      status: 'pending'
    },
    { 
      id: '3', 
      name: '胃药', 
      time: '19:00', 
      date: '2025-10-22', 
      dosage: '1粒', 
      status: 'pending'
    },
    { 
      id: '4', 
      name: '降压药', 
      time: '08:00', 
      date: '2025-10-23', 
      dosage: '1片', 
      status: 'pending'
    },
    { 
      id: '5', 
      name: '降糖药', 
      time: '20:00', 
      date: '2025-10-23', 
      dosage: '1片', 
      status: 'pending'
    },
    { 
      id: '6', 
      name: '抗生素', 
      time: '09:00', 
      date: '2025-10-21', 
      dosage: '2片', 
      status: 'taken'
    },
    { 
      id: '7', 
      name: '退烧药', 
      time: '15:30', 
      date: '2025-10-20', 
      dosage: '1片', 
      status: 'missed',
      notes: '体温超过38.5℃时服用'
    },
  ]);
  
  // 获取月份的所有日期
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  
  // 生成月份日历
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    // 获取当月第一天
    const firstDay = new Date(year, month, 1);
    // 获取下月第一天
    const lastDay = new Date(year, month + 1, 0);
    
    // 获取当月第一天是星期几
    const firstDayOfWeek = firstDay.getDay();
    
    // 填充日历数组（包括上个月的最后几天）
    const days = [];
    
    // 添加上个月的日期
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevMonthDay = new Date(year, month, -i);
      days.push(prevMonthDay);
    }
    
    // 添加当月的日期
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // 计算需要添加的下个月的日期数量，以使日历总共有6行
    const remainingDays = 42 - days.length; // 6行7列 = 42个日期
    
    // 添加下个月的日期
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    setDaysInMonth(days);
  }, [selectedDate]);
  
  // 获取指定日期的用药提醒
  const getRemindersForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return reminders.filter(reminder => reminder.date === dateString);
  };
  
  // 检查指定日期是否有用药提醒
  const hasReminders = (date: Date) => {
    return getRemindersForDate(date).length > 0;
  };
  
  // 检查是否为今天
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };
  
  // 检查是否为选中的日期
  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };
  
  // 处理选择日期
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  
  // 处理用药提醒标记为已服用
  const handleMarkAsTaken = (id: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => 
        reminder.id === id ? { ...reminder, status: 'taken' } : reminder
      )
    );
  };
  
  // 导航到上一个月
  const navigateToPreviousMonth = () => {
    setSelectedDate(prevDate => {
      const prevMonth = new Date(prevDate);
      prevMonth.setMonth(prevDate.getMonth() - 1);
      return prevMonth;
    });
  };
  
  // 导航到下一个月
  const navigateToNextMonth = () => {
    setSelectedDate(prevDate => {
      const nextMonth = new Date(prevDate);
      nextMonth.setMonth(prevDate.getMonth() + 1);
      return nextMonth;
    });
  };
  
  // 导航到首页
  const navigateToHome = () => {
    navigate('/');
  };
  
  // 导航到添加用药提醒页面
  const navigateToAddReminder = () => {
    // 实际项目中应该导航到添加页面，这里先使用toast提示
    alert('添加用药提醒功能开发中');
  };
  
  // 获取当前选中日期的用药提醒
  const selectedDateReminders = getRemindersForDate(selectedDate);
  
  // 格式化月份显示
  const formattedMonth = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月`;
  
  // 格式化选中日期显示
  const formattedSelectedDate = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`;
  
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
              <Calendar className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">用药日历</h1>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95, y: 2 }}
          onClick={navigateToAddReminder}
          className="px-4 py-2 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
        >
          <Plus className="h-4 w-4 inline mr-1" /> 添加
        </motion.button>
      </header>
      
      {/* 内容区域 */}
      <main className="px-4 py-6 space-y-8">
        {/* 日历导航 */}
        <div className="flex justify-between items-center">
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            onClick={navigateToPreviousMonth}
            className="p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <h2 className="text-2xl font-black uppercase tracking-tight">{formattedMonth}</h2>
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            onClick={navigateToNextMonth}
            className="p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
        
        {/* 日历 - 新粗野主义风格 */}
        <motion.div 
          className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 星期标题 */}
          <div className="grid grid-cols-7 border-b-2 border-black">
            {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
              <div 
                key={index} 
                className={`text-center py-3 text-sm font-bold uppercase ${
                  (index === 0 || index === 6) 
                    ? 'bg-[#F87171] text-black' 
                    : 'bg-[#e5e7eb]'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* 日期格子 */}
          <div className="grid grid-cols-7 divide-x divide-y divide-black">
            {daysInMonth.map((date, index) => {
              const currentMonth = date.getMonth() === selectedDate.getMonth();
              const hasReminder = hasReminders(date);
              const isCurrentSelectedDate = isSelectedDate(date);
              const isTodayDate = isToday(date);
              
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-16 flex flex-col items-center justify-center relative ${
                    !currentMonth 
                      ? 'bg-[#f3f4f6] text-gray-500' 
                      : (isCurrentSelectedDate 
                        ? 'bg-[#67E8F9] text-black' 
                        : isTodayDate
                          ? 'bg-white border-2 border-black border-offset-2'
                          : 'bg-white')
                  }`}
                  onClick={() => currentMonth && handleSelectDate(date)}
                >
                  <span className={`text-base font-bold ${
                    !currentMonth && !isCurrentSelectedDate ? 'text-gray-500' : ''
                  }`}>
                    {date.getDate()}
                  </span>
                  
                  {hasReminder && currentMonth && (
                    <div className="absolute bottom-2 flex gap-1">
                      {getRemindersForDate(date).map((_, i) => (
                        <span key={i} className={`w-2 h-2 ${
                          _.status === 'taken' ? 'bg-[#86EFAC]' : 
                          _.status === 'missed' ? 'bg-[#F87171]' : 'bg-[#67E8F9]'
                        } border border-black`}></span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* 选中日期的用药提醒 - 新粗野主义风格 */}
        <section>
          <div className="mb-4">
            <motion.button
              whileHover={{ y: -2, boxShadow: '5px 5px 0 0 #000' }}
              whileTap={{ y: 0, boxShadow: '2px 2px 0 0 #000' }}
              className="px-4 py-2 bg-[#FFE066] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
            >
              {formattedSelectedDate} 用药提醒
            </motion.button>
          </div>
          
          <motion.div 
            className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {selectedDateReminders.length > 0 ? (
              <div className="divide-y-2 divide-black">
                {selectedDateReminders.map((reminder) => {
                  // 根据状态确定背景色
                  let bgColor = '';
                  switch(reminder.status) {
                    case 'pending': bgColor = 'bg-[#E0F2FE]'; break;
                    case 'taken': bgColor = 'bg-[#DCFCE7]'; break;
                    case 'missed': bgColor = 'bg-[#FEE2E2]'; break;
                  }
                  
                  return (
                    <motion.div 
                      key={reminder.id}
                      className={`p-4 ${bgColor}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 flex items-center justify-center border-2 border-black ${
                            reminder.status === 'pending' ? 'bg-[#67E8F9]' : 
                            reminder.status === 'taken' ? 'bg-[#86EFAC]' : 'bg-[#F87171]'
                          }`}>
                            <Pill className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{reminder.name}</h4>
                              <span className="text-sm font-bold digital">{reminder.time}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs px-3 py-1 bg-white border-2 border-black font-bold">
                                {reminder.dosage}
                              </span>
                              
                              {reminder.status === 'pending' && (
                                <span className="text-xs px-3 py-1 bg-[#FFE066] border-2 border-black font-bold">
                                  待服用
                                </span>
                              )}
                              
                              {reminder.status === 'taken' && (
                                <span className="text-xs px-3 py-1 bg-[#86EFAC] border-2 border-black font-bold">
                                  已服用
                                </span>
                              )}
                              
                              {reminder.status === 'missed' && (
                                <span className="text-xs px-3 py-1 bg-[#F87171] border-2 border-black font-bold">
                                  已错过
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {reminder.status === 'pending' && (
                          <motion.button
                            whileTap={{ scale: 0.95, y: 2 }}
                            onClick={() => handleMarkAsTaken(reminder.id)}
                            className="p-3 bg-[#67E8F9] text-black border-2 border-black shadow-[3px_3px_0_0_#000]"
                          >
                            <Check className="h-5 w-5" />
                          </motion.button>
                        )}
                      </div>
                      
                      {reminder.notes && (
                        <div className="mt-3 flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 mt-0.5 text-[#F87171]" />
                          <span className="text-xs font-bold">{reminder.notes}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="h-16 w-16 mb-4 text-[#e5e7eb]" />
                <p className="text-base font-bold uppercase">当天没有用药提醒</p>
                <motion.button
                  whileTap={{ scale: 0.95, y: 2 }}
                  onClick={navigateToAddReminder}
                  className="mt-6 px-6 py-3 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
                >
                  添加用药提醒
                </motion.button>
              </div>
            )}
          </motion.div>
        </section>
      </main>
    </div>
  );
}