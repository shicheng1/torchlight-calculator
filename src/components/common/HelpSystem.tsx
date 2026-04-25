import React, { useState } from 'react';

interface HelpSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpSystem: React.FC<HelpSystemProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('getting-started');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">帮助中心</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'getting-started' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('getting-started')}
          >
            快速开始
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'calculation' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('calculation')}
          >
            计算原理
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'faq' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('faq')}
          >
            常见问题
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'tips' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('tips')}
          >
            使用技巧
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'getting-started' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">快速开始指南</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>选择英雄</strong>：在顶部选择你要计算的英雄</li>
                <li><strong>配置装备</strong>：在装备面板中添加和编辑装备</li>
                <li><strong>选择技能</strong>：在技能面板中选择和配置技能</li>
                <li><strong>调整天赋</strong>：在天赋面板中分配天赋点</li>
                <li><strong>查看结果</strong>：在结果面板中查看详细的伤害计算结果</li>
              </ol>
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <p className="text-blue-700">
                  <strong>提示：</strong> 你可以使用导入/导出功能分享你的构建配置
                </p>
              </div>
            </div>
          )}

          {activeTab === 'calculation' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">伤害计算原理</h3>
              <p className="mb-2">伤害计算是一个多步骤的过程：</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>基础伤害计算</li>
                <li>伤害转换</li>
                <li>伤害放大（增加伤害和更多伤害）</li>
                <li>暴击计算</li>
                <li>双倍伤害计算</li>
                <li>攻击速度计算</li>
                <li>DPS计算</li>
                <li>异常状态伤害计算</li>
              </ol>
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <p className="text-blue-700">
                  <strong>公式：</strong> DPS = 基础伤害 × 增加伤害倍数 × 更多伤害倍数 × 期望暴击伤害 × 期望双倍伤害 × 攻击速度
                </p>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">常见问题</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">计算结果与游戏内不符？</h4>
                  <p className="text-gray-600 pl-4">
                    - 检查装备属性是否正确<br />
                    - 确认技能等级和配置<br />
                    - 验证天赋点分配
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">如何提高伤害？</h4>
                  <p className="text-gray-600 pl-4">
                    - 优先提升主要伤害类型的加成<br />
                    - 平衡暴击率和暴击伤害<br />
                    - 合理搭配装备和天赋
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">支持哪些游戏版本？</h4>
                  <p className="text-gray-600 pl-4">
                    当前支持火炬之光无限最新版本，随着游戏更新，计算器会定期更新
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">使用技巧</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>使用伤害分解功能分析伤害来源</li>
                <li>尝试不同的装备组合，找到最优搭配</li>
                <li>注意平衡各种属性，避免过度堆叠单一属性</li>
                <li>利用导入/导出功能保存和分享你的构建</li>
                <li>定期更新计算器以获得最新的游戏数据</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded">
                <p className="text-green-700">
                  <strong>专家建议：</strong> 优先提升"更多伤害"效果，因为它们是乘法加成，比"增加伤害"更有效
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 text-center text-sm text-gray-500">
          <p>火炬之光无限伤害计算器 v1.2.0</p>
        </div>
      </div>
    </div>
  );
};

export default HelpSystem;
