// 状态筛选按钮组件 - 新粗野主义风格
interface StatusFilterButtonProps {
  label: string;
  isActive: boolean;
  color?: 'green' | 'amber' | 'red';
  onClick: () => void;
}

function StatusFilterButton({ label, isActive, color, onClick }: StatusFilterButtonProps) {
  const baseClasses = `px-3 py-1.5 text-xs font-bold uppercase border-2 border-black`;
  const activeClasses = {
    green: 'bg-[#86EFAC] text-black shadow-[3px_3px_0_0_#000]',
    amber: 'bg-[#FFE066] text-black shadow-[3px_3px_0_0_#000]',
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
  color?: 'green' | 'amber' | 'red';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorMap: Record<string, string> = {
    green: 'bg-[#86EFAC]',
    amber: 'bg-[#FFE066]',
    red: 'bg-[#F87171]',
    default: 'bg-[#67E8F9]'
  };
  
  const bgColor = colorMap[color || 'default'];
  
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
import { ArrowLeft, Plus, Pill, AlertCircle, Trash2, Edit, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// 药物库存类型定义
interface Medication {
  id: string;
  name: string;
  dosageForm: string; // 剂型
  dosage: string; // 剂量
  quantity: number; // 数量
  unit: string; // 单位
  expiryDate: string; // 过期日期
  notes?: string; // 备注
  status: 'normal' | 'low' | 'expired'; // 状态
}

export default function MedicationInventory() {
  const navigate = useNavigate();
  
  // 模拟药物库存数据
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: '维生素C',
      dosageForm: '片剂',
      dosage: '100mg',
      quantity: 30,
      unit: '片',
      expiryDate: '2026-12-31',
      notes: '每日一次，每次一片',
      status: 'normal'
    },
    {
      id: '2',
      name: '钙片',
      dosageForm: '咀嚼片',
      dosage: '500mg',
      quantity: 5,
      unit: '片',
      expiryDate: '2026-06-30',
      status: 'low'
    },
    {
      id: '3',
      name: '胃药',
      dosageForm: '胶囊',
      dosage: '20mg',
      quantity: 14,
      unit: '粒',
      expiryDate: '2025-12-15',
      notes: '饭后服用',
      status: 'normal'
    },
    {
      id: '4',
      name: '布洛芬',
      dosageForm: '缓释片',
      dosage: '300mg',
      quantity: 8,
      unit: '片',
      expiryDate: '2024-10-01',
      status: 'expired'
    },
    {
      id: '5',
      name: '阿莫西林',
      dosageForm: '胶囊',
      dosage: '250mg',
      quantity: 2,
      unit: '粒',
      expiryDate: '2026-08-31',
      status: 'low'
    }
  ]);
  
  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 筛选状态
  const [statusFilter, setStatusFilter] = useState<'all' | 'normal' | 'low' | 'expired'>('all');
  
  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  
  // 处理状态筛选
  const handleStatusFilter = (status: 'all' | 'normal' | 'low' | 'expired') => {
    setStatusFilter(status);
  };
  
  // 过滤药物列表
  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          medication.dosageForm.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || medication.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // 处理添加药物
  const handleAddMedication = () => {
    // 实际项目中应该导航到添加页面，这里先使用toast提示
    alert('添加药物功能开发中');
  };
  
  // 处理编辑药物
  const handleEditMedication = (id: string) => {
    // 实际项目中应该导航到编辑页面，这里先使用toast提示
    alert(`编辑药物ID: ${id}`);
  };
  
  // 处理删除药物
  const handleDeleteMedication = (id: string) => {
    if (window.confirm('确定要删除这个药物吗？')) {
      setMedications(prevMedications => 
        prevMedications.filter(medication => medication.id !== id)
      );
    }
  };
  
  // 导航到首页
  const navigateToHome = () => {
    navigate('/');
  };
  
  // 获取药物状态标签
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'normal':
        return '充足';
      case 'low':
        return '不足';
      case 'expired':
        return '已过期';
      default:
        return '未知';
    }
  };
  
  // 获取药物状态颜色
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'normal':
        return 'bg-[#86EFAC]';
      case 'low':
        return 'bg-[#FFE066]';
      case 'expired':
        return 'bg-[#F87171]';
      default:
        return 'bg-gray-200';
    }
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
              <Pill className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">药物库存</h1>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95, y: 2 }}
          onClick={handleAddMedication}
          className="px-4 py-2 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
        >
          <Plus className="h-4 w-4 inline mr-1" /> 添加
        </motion.button>
      </header>
      
      {/* 内容区域 */}
      <main className="px-4 py-6 space-y-8">
        {/* 搜索框 - 新粗野主义风格 */}
        <div className="relative border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="搜索药物名称或剂型..."
            value={searchKeyword}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border-none focus:outline-none focus:ring-0"
          />
        </div>
        
        {/* 状态筛选 */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          <StatusFilterButton 
            label="全部" 
            isActive={statusFilter === 'all'} 
            onClick={() => handleStatusFilter('all')}
          />
          <StatusFilterButton 
            label="充足" 
            isActive={statusFilter === 'normal'} 
            color="green"
            onClick={() => handleStatusFilter('normal')}
          />
          <StatusFilterButton 
            label="不足" 
            isActive={statusFilter === 'low'} 
            color="amber"
            onClick={() => handleStatusFilter('low')}
          />
          <StatusFilterButton 
            label="过期" 
            isActive={statusFilter === 'expired'} 
            color="red"
            onClick={() => handleStatusFilter('expired')}
          />
        </div>
        
        {/* 药物库存列表 - 新粗野主义风格 */}
        <motion.div 
          className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredMedications.length > 0 ? (
            <div className="divide-y-2 divide-black">
              {filteredMedications.map((medication) => {
                // 根据状态确定背景色
                let bgColor = '';
                switch(medication.status) {
                  case 'expired': bgColor = 'bg-[#FEE2E2]'; break;
                }
                
                return (
                  <motion.div
                    key={medication.id}
                    className={`p-4 ${bgColor}`}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center border-2 border-black ${getStatusColor(medication.status)}`}>
                          <Pill className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-lg">{medication.name}</h4>
                            <span className={`text-xs px-3 py-1 font-bold uppercase border-2 border-black ${getStatusColor(medication.status)}`}>
                              {getStatusLabel(medication.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-bold">{medication.dosageForm} · {medication.dosage}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9, y: 1 }}
                          onClick={() => handleEditMedication(medication.id)}
                          className="p-2 bg-white border-2 border-black shadow-[2px_2px_0_0_#000]"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9, y: 1 }}
                          onClick={() => handleDeleteMedication(medication.id)}
                          className="p-2 bg-white border-2 border-black shadow-[2px_2px_0_0_#000]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 bg-white border-2 border-black">
                        <span className="text-xs font-bold mr-2">剩余数量:</span>
                        <span className={`text-lg font-black digital ${
                          medication.status === 'low' || medication.status === 'expired' 
                            ? 'bg-[#F87171] px-2' 
                            : ''
                        }`}>
                          {medication.quantity} {medication.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white border-2 border-black">
                        <span className="text-xs font-bold mr-2">有效期至:</span>
                        <span className={`text-lg font-black digital ${
                          medication.status === 'expired' 
                            ? 'bg-[#F87171] px-2' 
                            : ''
                        }`}>
                          {medication.expiryDate}
                        </span>
                      </div>
                    </div>
                    
                    {medication.notes && (
                      <motion.div 
                        className="mt-4 p-3 bg-[#FFE066] border-2 border-black"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 mt-0.5" />
                          <span className="text-sm font-bold">{medication.notes}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Pill className="h-16 w-16 mb-6 text-[#e5e7eb]" />
              <p className="text-base font-bold uppercase">{searchKeyword ? '没有找到匹配的药物' : '药物库存为空'}</p>
              <motion.button
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={handleAddMedication}
                className="mt-6 px-6 py-3 bg-[#67E8F9] text-black font-bold text-sm uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
              >
                添加药物
              </motion.button>
            </div>
          )}
        </motion.div>
        
        {/* 库存统计 */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard 
            title="总药物数" 
            value={medications.length.toString()} 
            icon={<Pill className="h-4 w-4" />}
          />
          <StatCard 
            title="库存不足" 
            value={medications.filter(m => m.status === 'low').length.toString()} 
            icon={<AlertCircle className="h-4 w-4" />}
            color="amber"
          />
          <StatCard 
            title="已过期" 
            value={medications.filter(m => m.status === 'expired').length.toString()} 
            icon={<Trash2 className="h-4 w-4" />}
            color="red"
          />
        </div>
      </main>
      

    </div>
  );
}