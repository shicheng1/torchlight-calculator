import { useState } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import {
  getAllTalentBoards,
  type TalentBoardData,
  type TalentNodeData,
  type CoreTalentSlot,
  type CoreTalentOption,
} from '@/data/talent-trees/index.ts';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** 按层级 (requiredPoints) 分组天赋节点 */
function groupNodesByTier(nodes: TalentNodeData[]): Map<number, TalentNodeData[]> {
  const tiers = new Map<number, TalentNodeData[]>();
  for (const node of nodes) {
    const tier = node.requiredPoints;
    if (!tiers.has(tier)) tiers.set(tier, []);
    tiers.get(tier)!.push(node);
  }
  return tiers;
}

/** 获取节点视觉样式 */
function getNodeClasses(node: TalentNodeData, isActive: boolean, isLocked: boolean): string {
  if (isLocked) return 'bg-[#111] border-[#222] opacity-40';

  switch (node.nodeType) {
    case 'micro':
      return isActive
        ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/40'
        : 'bg-[#1a1a3a] border-[#3a3a5a] hover:border-blue-400/60';
    case 'medium':
      return isActive
        ? 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/40'
        : 'bg-[#1a1a3a] border-[#3a3a5a] hover:border-purple-400/60';
    case 'legendary':
      return isActive
        ? 'bg-amber-500 border-amber-400 shadow-lg shadow-amber-500/40'
        : 'bg-[#1a1a3a] border-[#3a3a5a] hover:border-amber-400/60';
    default:
      return 'bg-[#1a1a3a] border-[#3a3a5a]';
  }
}

/** 获取节点尺寸样式 */
function getNodeSizeClass(nodeType: TalentNodeData['nodeType']): string {
  switch (nodeType) {
    case 'micro':
      return 'w-9 h-9 rounded-full';
    case 'medium':
      return 'w-11 h-11 rounded-lg';
    case 'legendary':
      return 'w-12 h-12 rounded-lg';
    default:
      return 'w-9 h-9 rounded-full';
  }
}

/* ------------------------------------------------------------------ */
/*  TalentNode - 单个天赋节点                                          */
/* ------------------------------------------------------------------ */

function TalentNode({
  node,
  points,
  isLocked,
  isHovered,
  onLeftClick,
  onRightClick,
  onHoverEnter,
  onHoverLeave,
}: {
  node: TalentNodeData;
  points: number;
  isLocked: boolean;
  isHovered: boolean;
  onLeftClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}) {
  const isActive = points > 0;
  const sizeClass = getNodeSizeClass(node.nodeType);
  const colorClass = getNodeClasses(node, isActive, isLocked);

  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* 节点本体 */}
      <div
        className={`${sizeClass} border-2 flex items-center justify-center cursor-pointer transition-all select-none ${colorClass}`}
        onClick={onLeftClick}
        onContextMenu={onRightClick}
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
      >
        <span className="text-xs font-bold font-mono text-white leading-none">
          {points > 0 ? points : ''}
        </span>
      </div>

      {/* 点数标签 */}
      <span className="text-[10px] font-mono text-[#a0a0b0] leading-none">
        {points}/{node.maxPoints}
      </span>

      {/* 悬浮提示 */}
      {isHovered && (
        <div className="absolute z-50 bg-[#0f0f23] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm shadow-xl max-w-52 whitespace-normal pointer-events-none"
          style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 }}
        >
          {/* 小三角 */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#0f0f23] border-r border-b border-[#2a2a4a] rotate-45" />
          <div className="font-bold text-[#eaeaea]">{node.nameCN}</div>
          <div className="text-xs text-[#a0a0b0] mt-1">{node.description}</div>
          <div className="text-xs text-[#e94560] font-mono mt-1">
            {points}/{node.maxPoints}
          </div>
          {isLocked && (
            <div className="text-xs text-yellow-400 mt-1">
              需要投入 {node.requiredPoints} 点解锁
            </div>
          )}
          {!isLocked && points < node.maxPoints && (
            <div className="text-xs text-[#a0a0b0] mt-1">
              左键加点 / 右键减点
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CoreTalentSection - 核心天赋选择区域                                */
/* ------------------------------------------------------------------ */

function CoreTalentSection({
  boardId,
  slots,
  boardTotalPoints,
  selections,
  onSelect,
}: {
  boardId: string;
  slots: CoreTalentSlot[];
  boardTotalPoints: number;
  selections: Record<number, string>;
  onSelect: (boardId: string, slotIndex: number, optionId: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-[#eaeaea] flex items-center gap-2">
        <svg className="w-4 h-4 text-[#e94560]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        核心天赋
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {slots.map((slot, slotIndex) => {
          const isLocked = boardTotalPoints < slot.unlockPoints;
          const selectedOptionId = selections[slotIndex] ?? '';

          return (
            <div
              key={slotIndex}
              className={`bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border rounded-lg p-4 transition-all shadow-lg ${
                isLocked
                  ? 'border-[#222] opacity-60'
                  : 'border-[#2a2a4a] hover:border-[#e94560]/50'
              }`}
            >
              {/* 卡片头部 */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-[#eaeaea]">
                  核心天赋 {slotIndex === 0 ? 'I' : 'II'}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-[#1a1a3a] text-[#a0a0b0]">
                  {slot.unlockPoints}点解锁
                </span>
              </div>

              {/* 锁定状态 */}
              {isLocked ? (
                <div className="flex items-center justify-center py-6 text-[#a0a0b0] text-sm gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  未解锁
                </div>
              ) : (
                /* 选项按钮 */
                <div className="space-y-2">
                  {slot.options.map((option: CoreTalentOption) => {
                    const isSelected = selectedOptionId === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() =>
                          onSelect(boardId, slotIndex, isSelected ? null : option.id)
                        }
                        className={`w-full px-3 py-3 rounded border text-sm transition-all text-left ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-900/40 to-amber-800/20 border-amber-500 shadow-lg shadow-amber-500/20 text-[#eaeaea]'
                            : 'bg-[#1a1a3a] border-[#3a3a5a] hover:border-amber-500/50 text-[#a0a0b0] hover:text-[#eaeaea]'
                        }`}
                      >
                        <div className="font-medium mb-1">{option.nameCN}</div>
                        <div className="text-xs opacity-80 leading-snug">
                          {option.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TalentTreeGrid - 横向天赋树网格                                    */
/* ------------------------------------------------------------------ */

function TalentTreeGrid({
  board,
  getNodePoints,
  getBoardTotalPoints,
  onLeftClick,
  onRightClick,
}: {
  board: TalentBoardData;
  getNodePoints: (nodeId: string) => number;
  getBoardTotalPoints: (board: TalentBoardData) => number;
  onLeftClick: (node: TalentNodeData, board: TalentBoardData) => void;
  onRightClick: (e: React.MouseEvent, node: TalentNodeData) => void;
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const totalPoints = getBoardTotalPoints(board);

  // 计算网格尺寸和节点位置（横向布局）
  const nodes = board.nodes;
  const minY = Math.min(...nodes.map(n => n.y));
  const maxY = Math.max(...nodes.map(n => n.y));
  const minX = Math.min(...nodes.map(n => n.x));
  const maxX = Math.max(...nodes.map(n => n.x));
  
  // 横向布局：Y 轴作为横向层级，X 轴作为纵向位置
  const gridWidth = (maxY - minY + 1) * 100;
  const gridHeight = (maxX - minX + 1) * 80;

  // 生成连接线（横向布局）
  const renderConnections = () => {
    const connections = [];
    // 连接相邻横向层级的节点
    for (let y = minY; y < maxY; y++) {
      const currentTier = nodes.filter(n => n.y === y);
      const nextTier = nodes.filter(n => n.y === y + 1);
      
      currentTier.forEach(currentNode => {
        nextTier.forEach(nextNode => {
          // 只连接纵向距离为1或2的节点
          if (Math.abs(currentNode.x - nextNode.x) <= 2) {
            // 横向布局：交换 X 和 Y 轴
            const x1 = (currentNode.y - minY) * 100 + 50;
            const y1 = (currentNode.x - minX) * 80 + 40;
            const x2 = (nextNode.y - minY) * 100 + 50;
            const y2 = (nextNode.x - minX) * 80 + 40;
            
            connections.push(
              <line
                key={`${currentNode.id}-${nextNode.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={totalPoints >= currentNode.requiredPoints ? '#2a2a4a' : '#111'}
                strokeWidth={2}
                strokeOpacity={totalPoints >= currentNode.requiredPoints ? 0.6 : 0.2}
              />
            );
          }
        });
      });
    }
    return connections;
  };

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-4">
      {/* 天赋树网格 */}
      <div className="relative overflow-x-auto" style={{ minHeight: '300px' }}>
        <svg 
          width={gridWidth + 100} 
          height={gridHeight + 80}
          className="block"
        >
          {/* 连接线 */}
          {renderConnections()}
          
          {/* 节点 */}
          {nodes.map(node => {
            const isActive = getNodePoints(node.id) > 0;
            const isLocked = totalPoints < node.requiredPoints;
            const sizeClass = getNodeSizeClass(node.nodeType);
            const colorClass = getNodeClasses(node, isActive, isLocked);
            
            // 横向布局：交换 X 和 Y 轴
            const x = (node.y - minY) * 100 + 50;
            const y = (node.x - minX) * 80 + 40;
            
            return (
              <g key={node.id}>
                <foreignObject 
                  x={x - 25} 
                  y={y - 25} 
                  width="50" 
                  height="50"
                >
                  <div 
                    className={`${sizeClass} border-2 flex items-center justify-center cursor-pointer transition-all select-none ${colorClass}`}
                    onClick={() => onLeftClick(node, board)}
                    onContextMenu={e => onRightClick(e, node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <span className="text-xs font-bold font-mono text-white leading-none">
                      {isActive ? getNodePoints(node.id) : ''}
                    </span>
                  </div>
                </foreignObject>
                
                {/* 点数标签 */}
                <text 
                  x={x} 
                  y={y + 40} 
                  textAnchor="middle" 
                  className="text-[10px] font-mono text-[#a0a0b0]"
                >
                  {getNodePoints(node.id)}/{node.maxPoints}
                </text>
                
                {/* 层级标签 */}
                {node.y === minY && (
                  <text 
                    x={x} 
                    y={y - 30} 
                    textAnchor="middle" 
                    className="text-[10px] font-mono text-[#a0a0b0]"
                  >
                    {node.requiredPoints}点
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-4 pt-4 text-xs text-[#a0a0b0] border-t border-[#2a2a4a]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>基础 (3点)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-purple-500" />
          <span>进阶</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-amber-500" />
          <span>神格 (1点)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#111] border border-[#222] opacity-40" />
          <span>未解锁</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TalentPanel - 主组件                                               */
/* ------------------------------------------------------------------ */

export function TalentPanel() {
  const boards = getAllTalentBoards();
  const [selectedBoardId, setSelectedBoardId] = useState(boards[0]?.id ?? '');
  const { loadout, setTalentPoints, setCoreTalent } = useBuildStore();

  const selectedBoard = boards.find(b => b.id === selectedBoardId);

  /* ---- 天赋点数操作 ---- */

  const getNodePoints = (nodeId: string): number => {
    return loadout.talents.find(t => t.nodeId === nodeId)?.points ?? 0;
  };

  const getBoardTotalPoints = (board: TalentBoardData): number => {
    return board.nodes.reduce(
      (sum, node) => sum + (loadout.talents.find(t => t.nodeId === node.id)?.points ?? 0),
      0,
    );
  };

  const canAllocate = (node: TalentNodeData, board: TalentBoardData): boolean => {
    const current = getNodePoints(node.id);
    if (current >= node.maxPoints) return false;
    if (getBoardTotalPoints(board) < node.requiredPoints) return false;
    return true;
  };

  const handleLeftClick = (node: TalentNodeData, board: TalentBoardData) => {
    if (canAllocate(node, board)) {
      setTalentPoints(node.id, getNodePoints(node.id) + 1);
    }
  };

  const handleRightClick = (e: React.MouseEvent, node: TalentNodeData) => {
    e.preventDefault();
    const current = getNodePoints(node.id);
    if (current > 0) {
      setTalentPoints(node.id, current - 1);
    }
  };

  /* ---- 核心天赋选择 ---- */

  const handleCoreSelect = (boardId: string, slotIndex: number, optionId: string | null) => {
    setCoreTalent(boardId, slotIndex, optionId);
  };

  // 从天赋板数据中读取核心天赋槽位
  const coreSlots = selectedBoard?.coreSlots ?? [];
  const boardTotalPoints = selectedBoard ? getBoardTotalPoints(selectedBoard) : 0;

  // 从 store 读取当前核心天赋选择
  const boardCoreSelections: Record<number, string> = {};
  const coreTalents = Array.isArray(loadout.coreTalents) ? loadout.coreTalents : [];
  for (const ct of coreTalents) {
    if (ct.boardId === selectedBoardId) {
      boardCoreSelections[ct.slotIndex] = ct.optionId;
    }
  }

  /* ---- 统计 ---- */

  const totalUsed = (Array.isArray(loadout.talents) ? loadout.talents : []).reduce((sum, t) => sum + t.points, 0);
  const totalMax = boards.reduce(
    (sum, board) => sum + board.nodes.reduce((s, n) => s + n.maxPoints, 0),
    0,
  );

  /* ---- 渲染 ---- */

  return (
    <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-[#0f0f23] max-h-[calc(100vh-64px)]">
      <h2 className="text-lg font-bold text-[#eaeaea]">天赋配置</h2>

      {/* ====== 天赋板选择 ====== */}
      <div className="flex gap-2">
        {boards.map(board => (
          <button
            key={board.id}
            onClick={() => setSelectedBoardId(board.id)}
            className={`flex-1 px-3 py-2 rounded text-sm transition-colors border ${
              selectedBoardId === board.id
                ? 'bg-[#e94560]/20 border-[#e94560] text-[#e94560]'
                : 'bg-[#1a1a2e] border-[#2a2a4a] text-[#a0a0b0] hover:border-[#e94560]/50'
            }`}
          >
            <div className="font-medium">{board.nameCN}</div>
            <div className="text-xs opacity-70">{board.description}</div>
          </button>
        ))}
      </div>

      {/* ====== 核心机制横幅 ====== */}
      {selectedBoard?.coreMechanic && (
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-xs text-[#eaeaea]">
          <span className="text-[#e94560] font-bold">核心机制：</span>
          {selectedBoard.coreMechanic}
        </div>
      )}

      {/* ====== 核心天赋选择 ====== */}
      {selectedBoard && coreSlots && coreSlots.length > 0 && (
        <CoreTalentSection
          boardId={selectedBoard.id}
          slots={coreSlots}
          boardTotalPoints={boardTotalPoints}
          selections={boardCoreSelections}
          onSelect={handleCoreSelect}
        />
      )}

      {/* ====== 天赋树网格 ====== */}
      {selectedBoard && (
        <TalentTreeGrid
          board={selectedBoard}
          getNodePoints={getNodePoints}
          getBoardTotalPoints={getBoardTotalPoints}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
      )}

      {/* ====== 棱镜配置 ====== */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#eaeaea] flex items-center gap-2">
          <svg className="w-4 h-4 text-[#e94560]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          棱镜配置
        </h3>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#2a2a4a] rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((slot) => (
              <div key={slot} className="bg-[#1a1a3a] border border-[#3a3a5a] rounded-lg p-3 text-center">
                <div className="text-xs text-[#a0a0b0] mb-2">棱镜 {slot}</div>
                <div className="text-sm font-medium text-[#eaeaea]">未装备</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-[#a0a0b0] text-center">
            棱镜可提供额外的天赋效果和属性加成
          </div>
        </div>
      </div>

      {/* ====== 已用点数 ====== */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border border-[#2a2a4a] rounded px-4 py-3 shadow-lg">
        <span className="text-sm text-[#a0a0b0]">已用天赋点数</span>
        <span className="font-mono text-sm">
          <span className="text-[#e94560]">{totalUsed}</span>
          <span className="text-[#a0a0b0]"> / {totalMax}</span>
        </span>
      </div>
    </div>
  );
}
