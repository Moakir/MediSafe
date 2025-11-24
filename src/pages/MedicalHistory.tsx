// 科室筛选按钮组件 - 新粗野主义风格
interface DepartmentFilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function DepartmentFilterButton({ label, isActive, onClick }: DepartmentFilterButtonProps) {
  const baseClasses = `px-3 py-1.5 text-xs font-bold uppercase border-2 border-black`;
  const activeClasses = 'bg-[#67E8F9] text-black shadow-[3px_3px_0_0_#000]';
  const inactiveClasses = 'bg-white text-black';
  
  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 2 }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
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
  color?: 'blue';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const bgColor = color === 'blue' ? 'bg-[#67E8F9]' : 'bg-[#FFE066]';
  
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
import { ArrowLeft, FileText, CalendarDays, Clock, MapPin, Search, Filter, Trash2, Edit, Download } from 'lucide-react';
import { motion } from 'framer-motion';

// 门诊历史类型定义
interface MedicalVisit {
  id: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  hospital: string;
  diagnosis: string;
  treatmentPlan: string;
  notes?: string;
}

export default function MedicalHistory() {
  const navigate = useNavigate();
  
  // 模拟门诊历史数据
  const [medicalVisits, setMedicalVisits] = useState<MedicalVisit[]>([
    {
      id: '1',
      date: '2025-10-15',
      time: '10:30',
      doctor: '张医生',
      department: '内科',
      hospital: '市第一医院',
      diagnosis: '原发性高血压',
      treatmentPlan: '1. 生活方式调整：低盐饮食、适量运动、戒烟限酒\n2. 药物治疗：氨氯地平 5mg 每日一次\n3. 定期监测血压，每月复诊',
      notes: '患者血压控制不佳，建议加强饮食控制'
    },
    {
      id: '2',
      date: '2025-09-20',
      time: '14:15',
      doctor: '李医生',
      department: '眼科',
      hospital: '市眼科医院',
      diagnosis: '轻度近视',
      treatmentPlan: '1. 定期进行视力检查\n2. 注意用眼卫生，避免长时间使用电子设备\n3. 建议配戴矫正眼镜'
    },
    {
      id: '3',
      date: '2025-08-05',
      time: '09:00',
      doctor: '王医生',
      department: '骨科',
      hospital: '省立医院',
      diagnosis: '膝关节滑膜炎',
      treatmentPlan: '1. 休息，避免剧烈运动\n2. 物理治疗：热敷、按摩\n3. 药物治疗：消炎止痛药',
      notes: '2周后复诊评估治疗效果'
    },
    {
      id: '4',
      date: '2025-07-12',
      time: '16:45',
      doctor: '刘医生',
      department: '口腔科',
      hospital: '口腔医院',
      diagnosis: '牙龈炎',
      treatmentPlan: '1. 口腔清洁：使用漱口水\n2. 饮食调整：避免辛辣刺激性食物\n3. 定期洗牙'
    }
  ]);
  
  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 筛选状态
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  
  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  
  // 处理科室筛选
  const handleDepartmentFilter = (department: string) => {
    setDepartmentFilter(department);
  };
  
  // 过滤门诊历史列表
  const filteredVisits = medicalVisits.filter(visit => {
    const matchesSearch = 
      visit.doctor.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      visit.department.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      visit.hospital.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      visit.diagnosis.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || visit.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });
  
  // 处理添加门诊记录
  const handleAddVisit = () => {
    // 实际项目中应该导航到添加页面，这里先使用toast提示
    alert('添加门诊记录功能开发中');
  };
  
  // 处理编辑门诊记录
  const handleEditVisit = (id: string) => {
    // 实际项目中应该导航到编辑页面，这里先使用toast提示
    alert(`编辑门诊记录ID: ${id}`);
  };
  
  // 处理删除门诊记录
  const handleDeleteVisit = (id: string) => {
    if (window.confirm('确定要删除这条门诊记录吗？')) {
      setMedicalVisits(prevVisits => 
        prevVisits.filter(visit => visit.id !== id)
      );
    }
  };
  
  // 处理导出门诊记录
  const handleExportVisit = (id: string) => {
    // 实际项目中应该实现导出功能，这里先使用toast提示
    alert(`导出门诊记录ID: ${id}`);
  };
  
  // 导航到首页
  const navigateToHome = () => {
    navigate('/');
  };
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  // 获取所有科室列表
  const departments = ['all', ...Array.from(new Set(medicalVisits.map(visit => visit.department)))];
  
  // 获取科室对应的颜色
  const getDepartmentColor = (department: string) => {
    const colorMap: Record<string, string> = {
      '内科': 'bg-[#67E8F9]',
      '眼科': 'bg-[#86EFAC]',
      '骨科': 'bg-[#FFE066]',
      '口腔科': 'bg-[#F87171]'
    };
    return colorMap[department] || 'bg-gray-200';
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
            <div className="w-10 h-10 bg-[#86EFAC] border-2 border-black flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">门诊历史</h1>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95, y: 2 }}
          onClick={handleAddVisit}
          className="px-4 py-2 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
        >
          <FileText className="h-4 w-4 inline mr-1" /> 添加
        </motion.button>
      </header>
      
      {/* 内容区域 */}
      <main className="px-4 py-6 space-y-8">
        {/* 搜索框 - 新粗野主义风格 */}
        <div className="relative border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="搜索医生、科室、医院或诊断..."
            value={searchKeyword}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border-none focus:outline-none focus:ring-0"
          />
        </div>
        
        {/* 科室筛选 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {departments.map((dept) => (
              <DepartmentFilterButton 
                key={dept}
                label={dept === 'all' ? '全部' : dept} 
                isActive={departmentFilter === dept} 
                onClick={() => handleDepartmentFilter(dept)}
              />
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            className="p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            <Filter className="h-5 w-5" />
          </motion.button>
        </div>
        
        {/* 门诊历史列表 - 新粗野主义风格 */}
        <motion.div 
          className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredVisits.length > 0 ? (
            <div className="divide-y-2 divide-black">
              {filteredVisits.map((visit) => (
                <motion.div
                  key={visit.id}
                  className="p-4"
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-lg">{visit.doctor}</h4>
                        <span className={`text-xs px-3 py-1 font-bold uppercase border-2 border-black ${getDepartmentColor(visit.department)}`}>
                          {visit.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold">{visit.hospital}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9, y: 1 }}
                        onClick={() => handleExportVisit(visit.id)}
                        className="p-2 bg-white border-2 border-black shadow-[2px_2px_0_0_#000]"
                      >
                        <Download className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9, y: 1 }}
                        onClick={() => handleEditVisit(visit.id)}
                        className="p-2 bg-white border-2 border-black shadow-[2px_2px_0_0_#000]"
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9, y: 1 }}
                        onClick={() => handleDeleteVisit(visit.id)}
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
                        <span className="text-sm font-medium">{formatDate(visit.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white border-2 border-black">
                      <Clock className="h-5 w-5" />
                      <div>
                        <span className="text-xs font-bold block">时间</span>
                        <span className="text-sm font-medium">{visit.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white border-2 border-black">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-xs font-bold block">诊断结果</span>
                        <span className="text-sm">{visit.diagnosis}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white border-2 border-black">
                    <div className="flex items-start gap-2">
                      <i className="fa-solid fa-stethoscope h-5 w-5 mt-0.5 text-[#67E8F9]" />
                      <div className="flex-1">
                        <span className="text-xs font-bold block">治疗方案</span>
                        {visit.treatmentPlan.split('\n').map((item, index) => (
                          <p key={index} className={`text-sm mt-${index > 0 ? 2 : 0}`}>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {visit.notes && (
                    <motion.div 
                      className="mt-4 p-3 bg-[#FFE066] border-2 border-black"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-info h-5 w-5 mt-0.5" />
                        <span className="text-sm font-bold">{visit.notes}</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="h-16 w-16 mb-6 text-[#e5e7eb]" />
              <p className="text-base font-bold uppercase">没有找到门诊记录</p>
              <motion.button
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={handleAddVisit}
                className="mt-6 px-6 py-3 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
              >
                添加门诊记录
              </motion.button>
            </div>
          )}
        </motion.div>
        
        {/* 统计信息 */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            title="总就诊次数" 
            value={medicalVisits.length.toString()} 
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard 
            title="就诊科室数" 
            value={(departments.length - 1).toString()} 
            icon={<MapPin className="h-4 w-4" />}
            color="blue"
          />
        </div>
      </main>
      

    </div>
  );
}
{/* 移除页面底部的空白区域，由全局的底部导航栏负责 */}