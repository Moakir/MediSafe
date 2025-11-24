import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquareText, Send, Paperclip, Heart, Share2, ChevronDown, BrainCircuit, Lightbulb, History, Trash2, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

// 消息类型定义
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  liked?: boolean;
  category?: 'drug' | 'health' | 'general';
}

// 定义 SpeechRecognition 类型
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: any) => void;
  onend: () => void;
  onerror: (event: any) => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechRecognition?: new () => SpeechRecognition;
  }
}

export default function HealthConsultation() {
  const navigate = useNavigate();
  const { theme, isDark } = useTheme();
  
  // 消息列表
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '欢迎使用健康咨询助手！我可以为您提供药物知识、健康咨询等服务。请问有什么可以帮助您的？',
      sender: 'ai',
      timestamp: Date.now() - 300000, // 5分钟前
      category: 'general'
    }
  ]);
  
  // 输入框内容
  const [inputText, setInputText] = useState('');
  
  // 聊天区域引用，用于自动滚动到底部
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // 语音识别状态
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  // 预定义的问题
  const predefinedQuestions = [
    '如何正确服用感冒药？',
    '高血压患者饮食需要注意什么？',
    '常见抗生素的副作用有哪些？',
    '如何缓解失眠症状？'
  ];
  
  // 模拟AI回复
  const mockAIResponses: Record<string, string> = {
    '如何正确服用感冒药？': 
      '感冒药的正确服用方法取决于具体药物类型。一般来说：\n\n1. 按照说明书或医嘱的剂量和频率服用\n2. 多数感冒药建议饭后服用，以减少对胃的刺激\n3. 不要同时服用多种含有相同成分的感冒药\n4. 服用期间避免饮酒\n5. 如症状持续加重或超过3天未见好转，应及时就医\n\n请问您具体想了解哪种感冒药的服用方法？',
    '高血压患者饮食需要注意什么？': 
      '高血压患者的饮食调整非常重要，以下是一些建议：\n\n1. 减少钠的摄入：每天盐的摄入量不超过5克\n2. 增加钾的摄入：多吃新鲜蔬菜和水果\n3. 控制脂肪摄入：选择不饱和脂肪，避免反式脂肪\n4. 适量摄入蛋白质：选择鱼类、 poultry等优质蛋白质\n5. 限制饮酒：男性每天不超过2杯，女性不超过1杯\n6. 增加膳食纤维：多吃全谷物、蔬菜和水果\n\n此外，保持健康的体重、规律运动和减少压力也对控制血压有帮助。',
    '常见抗生素的副作用有哪些？': 
      '抗生素的副作用因药物种类而异，常见的副作用包括：\n\n1. 胃肠道反应：恶心、呕吐、腹泻、腹痛\n2. 过敏反应：皮疹、瘙痒、呼吸困难（严重时）\n3. 肝肾功能损害：长期或大剂量使用可能影响肝肾功能\n4. 菌群失调：可能导致念珠菌感染等二次感染\n5. 神经系统反应：头痛、头晕、失眠等\n\n使用抗生素时应严格遵循医嘱，不要自行增减剂量或停药。如出现严重不适，应立即就医。',
    '如何缓解失眠症状？': 
      '缓解失眠可以尝试以下方法：\n\n1. 建立规律的睡眠时间表，每天同一时间上床和起床\n2. 创造良好的睡眠环境：保持卧室安静、黑暗和凉爽\n3. 避免睡前使用电子设备，因为蓝光会抑制褪黑素的产生\n4. 限制咖啡因和酒精的摄入，特别是下午和晚上\n5. 睡前进行放松活动，如阅读、听轻音乐或泡热水澡\n6. 适量运动，但避免在睡前3小时内进行剧烈运动\n\n如果失眠问题持续存在，建议咨询医生以获得专业帮助。'
  };
  
  // 初始化语音识别API
  useEffect(() => {
    // 检查浏览器是否支持语音识别API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      // 配置语音识别
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'zh-CN'; // 设置为中文
      
      // 设置语音识别事件处理程序
      recognitionInstance.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setInputText(speechResult);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
        // 自动发送识别结果
        if (inputText.trim()) {
          setTimeout(() => {
            handleSendMessage();
          }, 500);
        }
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('语音识别错误:', event.error);
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      // 清理
      if (recognition) {
        recognition.stop();
      }
    };
  }, [inputText]);
  
  // 自动滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // 清空输入框
    setInputText('');
    
    // 模拟AI回复延迟
    setTimeout(() => {
      // 检查是否有预定义的回复
      let aiResponseText = '感谢您的提问！我正在整理相关信息，稍后为您提供详细回答。如需更专业的医疗建议，请咨询您的医生。';
      
      if (mockAIResponses[inputText.trim()]) {
        aiResponseText = mockAIResponses[inputText.trim()];
      }
      
      // 判断问题类型
      let category: 'drug' | 'health' | 'general' = 'general';
      if (inputText.includes('药') || inputText.includes('服用') || inputText.includes('副作用')) {
        category = 'drug';
      } else if (inputText.includes('血压') || inputText.includes('失眠') || inputText.includes('饮食')) {
        category = 'health';
      }
      
      // 添加AI回复
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: Date.now(),
        category: category
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);
  };
  
  // 处理发送预定义问题
  const handleSendPredefinedQuestion = (question: string) => {
    // 清空输入框并发送预定义问题
    setInputText('');
    setMessages(prevMessages => [...prevMessages, {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: Date.now()
    }]);
    
    // 模拟AI回复延迟
    setTimeout(() => {
      // 添加AI回复
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: mockAIResponses[question],
        sender: 'ai',
        timestamp: Date.now(),
        category: question.includes('药') || question.includes('服用') ? 'drug' : 'health'
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);
  };
  
  // 处理点赞消息
  const handleLikeMessage = (id: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id ? { ...message, liked: !message.liked } : message
      )
    );
  };
  
  // 处理删除消息
  const handleDeleteMessage = (id: string) => {
    if (window.confirm('确定要删除这条消息吗？')) {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
    }
  };
  
  // 处理语音输入
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('您的浏览器不支持语音识别功能');
      return;
    }
    
    if (isRecording) {
      // 停止录音
      recognition.stop();
      setIsRecording(false);
    } else {
      // 开始录音
      try {
        recognition.start();
        setIsRecording(true);
      } catch (error) {
        console.error('启动语音识别失败:', error);
        alert('启动语音识别失败，请稍后再试');
      }
    }
  };
  
  // 导航到首页
  const navigateToHome = () => {
    navigate('/');
  };
  
  // 格式化时间显示
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // 获取消息类型图标
  const getCategoryIcon = (category?: string) => {
    switch(category) {
      case 'drug':
        return <i className="fa-solid fa-pills text-blue-500"></i>;
      case 'health':
        return <i className="fa-solid fa-heart-pulse text-red-500"></i>;
      default:
        return <i className="fa-solid fa-robot text-purple-500"></i>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
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
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">健康咨询</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            className="p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            <History className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            className="p-3 bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>
      </header>
      
       {/* 聊天区域 - 增加底部内边距防止被输入框遮挡 */}
      <main 
        ref={chatContainerRef}
        className="flex-1 p-4 pb-32 overflow-y-auto space-y-6"
      >
        {/* 欢迎提示 */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2 bg-[#FFE066] text-black text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            智能助手对话
          </motion.div>
        </div>
        
        {/* 消息列表 */}
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(message.category)}
                      <span className="text-xs font-bold uppercase">
                        智能助手
                      </span>
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-[#67E8F9] text-black'
                      : 'bg-white text-black border-2 border-black'
                  } px-4 py-3 shadow-[4px_4px_0_0_#000]`}>
                    {/* 消息内容 */}
                    <div>
                      {message.text.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={`${index > 0 ? 'mt-4' : ''} text-sm whitespace-pre-wrap`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    {/* 消息时间 */}
                    <div className="flex justify-between items-center mt-3">
                      <span className={`text-xs font-bold digital ${
                        message.sender === 'user' ? '' : 'text-gray-700'
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                      
                      {/* 消息操作按钮 */}
                      <div className="flex gap-2">
                        {message.sender === 'ai' && (
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleLikeMessage(message.id)}
                            className={`p-1.5 bg-white border border-black shadow-[2px_2px_0_0_#000] ${
                              message.liked ? 'bg-[#F87171]' : ''
                            }`}
                          >
                            <Heart className={`h-3.5 w-3.5 ${message.liked ? 'fill-current' : ''}`} />
                          </motion.button>
                        )}
                        
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 bg-white border border-black shadow-[2px_2px_0_0_#000]"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </motion.button>
                        
                        {message.sender === 'user' && (
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteMessage(message.id)}
                            className="p-1.5 bg-white border border-black shadow-[2px_2px_0_0_#000]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* 预定义问题 */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white border-[3px] border-black p-4 shadow-[6px_6px_0_0_#000]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FFE066] border-2 border-black flex items-center justify-center">
                <Lightbulb className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-black uppercase">热门问题</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {predefinedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -2, boxShadow: '4px 4px 0 0 #000' }}
                  whileTap={{ y: 0, boxShadow: '2px 2px 0 0 #000' }}
                  onClick={() => handleSendPredefinedQuestion(question)}
                  className="p-3 bg-white text-left text-sm font-bold border-2 border-black shadow-[3px_3px_0_0_#000]"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* 提示信息 */}
        <div className="text-center py-6">
          <p className="text-xs font-bold uppercase bg-[#f3f4f6] border border-black inline-block px-4 py-2">
            以上回答仅供参考，不能替代专业医疗建议<br />如有健康问题，请咨询专业医生
          </p>
        </div>
      </main>
      
       {/* 输入区域 - 新粗野主义风格，提高z-index确保显示在最上层 */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-black p-3 shadow-[0_-4px_0_0_#000] z-40">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black shadow-[3px_3px_0_0_#000]"
          >
            <Paperclip className="h-5 w-5" />
          </motion.button>
          
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="请输入您的问题..."
              className="w-full resize-none h-12 px-4 py-2 border-[3px] border-black focus:outline-none focus:ring-0 focus-visible:border-[5px] focus-visible:border-black"
              rows={1}
            />
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            onClick={handleVoiceInput}
            className={`w-12 h-12 flex items-center justify-center border-2 border-black shadow-[3px_3px_0_0_#000] ${
              isRecording
                ? 'bg-[#F87171] text-black'
                : 'bg-white text-black'
            }`}
          >
            {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95, y: 2 }}
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`w-12 h-12 flex items-center justify-center border-2 border-black shadow-[3px_3px_0_0_#000] ${
              inputText.trim()
                ? 'bg-[#67E8F9] text-black'
                : 'bg-white text-gray-400'
            }`}
          >
            <Send className="h-6 w-6" />
          </motion.button>
        </div>
    </footer>
    {/* 健康咨询页面不显示底部导航栏，因为它有自己的固定底部输入区域 */}
    </div>
  );
}