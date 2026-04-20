import { useState } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import {
  getAllTalentBoards,
  type TalentBoardData,
  type TalentNodeData,
  type CoreTalentSlot,
  type CoreTalentOption,
} from '@/data/talent-trees/index.ts';
import { ErrorBoundary } from '@/components/common/ErrorBoundary.tsx';

// 辅助：获取节点样式类
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
    case 'legendary_medium':
    case 'legendary':
      return isActive
        ? 'bg-amber-500 border-amber-400 shadow-lg shadow-amber-500/40'
        : 'bg-[#1a1a3a] border-[#3a3a5a] hover:border-amber-400/60';
    default:
      return 'bg-[#1a1a3a] border-[#3a3a5a]';
  }
}

function getNodeSizeClass(nodeType: TalentNodeData['nodeType']): string {
  switch (nodeType) {
    case 'micro':
      return 'w-9 h-9 rounded-full';
    case 'medium':
      return 'w-10 h-10 rounded-lg';
    case 'legendary_medium':
    case 'legendary':
      return 'w-11 h-11 rounded-lg';
    default:
      return 'w-9 h-9 rounded-full';
  }
}

// 天赋板选择组件
function TalentBoardSelector({
  availableBoards,
  selectedBoards,
  onToggleBoard,
}: {
  availableBoards: TalentBoardData[];
  selectedBoards: string[];
  onToggleBoard: (boardId: string) => void;
}) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-4 mb-4">
      <h3 className="text-sm font-bold text-[#eaeaea] mb-3">选择天赋板 (最多4个)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {availableBoards.map((board) => {
          const isSelected = selectedBoards.includes(board.id);
          return (
            <button
              key={board.id}
              onClick={() => onToggleBoard(board.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-[#e94560]/20 border-[#e94560] text-[#eaeaea]'
                  : 'bg-[#0f0f23] border-[#2a2a4a] text-[#a0a0b0] hover:border-[#e94560]/50'
              }`}
            >
              <div className="font-medium text-sm">{board.nameCN}</div>
              <div className="text-xs opacity-70 mt-1">{board.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 单个天赋板的天赋树
function TalentBoardView({
  board,
  getNodePoints,
  getBoardTotalPoints,
  onLeftClick,
  onRightClick,
  onCoreSelect,
  boardCoreSelections,
}: {
  board: TalentBoardData;
  getNodePoints: (nodeId: string) => number;
  getBoardTotalPoints: (board: TalentBoardData) => number;
  onLeftClick: (node: TalentNodeData, board: TalentBoardData) => void;
  onRightClick: (e: React.MouseEvent, node: TalentNodeData) => void;
  onCoreSelect: (boardId: string, slotIndex: number, optionId: string | null) => void;
  boardCoreSelections: Record<number, string>;
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const totalPoints = getBoardTotalPoints(board);

  const nodes = board.nodes;
  const minY = Math.min(...nodes.map(n => n.y));
  const maxY = Math.max(...nodes.map(n => n.y));
  const minX = Math.min(...nodes.map(n => n.x));
  const maxX = Math.max(...nodes.map(n => n.x));

  const numTiers = maxY - minY + 1;
  const numRows = maxX - minX + 1;

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-4 mb-4">
      {/* 标题和点数统计 */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a4a]">
        <div>
          <h3 className="text-base font-bold text-[#eaeaea]">{board.nameCN}</h3>
          {board.coreMechanic && (
            <p className="text-xs text-[#a0a0b0] mt-1">{board.coreMechanic}</p>
          )}
        </div>
        <div className="text-right">
          <span className="text-[#e94560] font-mono font-bold">{totalPoints}</span>
          <span className="text-[#a0a0b0] text-sm"> 已投入</span>
        </div>
      </div>

      {/* 核心天赋选择区域 */}
      {board.coreSlots && board.coreSlots.length > 0 && (
        <div className="mb-4 p-3 bg-[#0f0f23] rounded-lg border border-[#2a2a4a]">
          <h4 className="text-sm font-medium text-[#eaeaea] mb-2">核心天赋</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {board.coreSlots.map((slot, slotIndex) => {
              const isLocked = totalPoints < slot.unlockPoints;
              const selectedOptionId = boardCoreSelections[slotIndex] ?? '';

              return (
                <div key={slotIndex}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#eaeaea]">
                      核心天赋 {slotIndex === 0 ? 'I' : 'II'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a3a] text-[#a0a0b0] border border-[#3a3a5a]">
                      {slot.unlockPoints}点解锁
                    </span>
                  </div>
                  {isLocked ? (
                    <div className="flex items-center justify-center py-4 text-[#a0a0b0] text-xs">
                      <span>已锁定</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {slot.options.map((option) => {
                        const isSelected = selectedOptionId === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() =>
                              onCoreSelect(board.id, slotIndex, isSelected ? null : option.id)
                            }
                            className={`w-full px-3 py-2 rounded-lg border text-xs transition-all text-left ${
                              isSelected
                                ? 'bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-500 text-[#eaeaea]'
                                : 'bg-[#1a1a3a] border-[#3a3a5a] hover:border-amber-500/50 text-[#a0a0b0] hover:text-[#eaeaea]'
                            }`}
                          >
                            <div className="font-medium mb-0.5">{option.nameCN}</div>
                            <div className="opacity-70 leading-tight">{option.description}</div>
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
      )}

      {/* 天赋树网格 */}
      <div className="relative overflow-x-auto">
        <div
          className="flex flex-col-reverse items-start gap-0.5 py-2"
          style={{ width: `${numTiers * 110}px` }}
        >
          {Array.from({ length: numRows }).map((_, rowIdx) => {
            const currentX = minX + rowIdx;
            const rowNodes = nodes.filter(n => n.x === currentX);

            return (
              <div
                key={`row-${currentX}`}
                className="flex items-center justify-start gap-0.5"
                style={{ width: `${numTiers * 110}px`, minHeight: '50px' }}
              >
                {Array.from({ length: numTiers }).map((_, tierIdx) => {
                  const currentY = minY + tierIdx;
                  const node = rowNodes.find(n => n.y === currentY);

                  if (!node) {
                    return (
                      <div
                        key={`empty-${currentX}-${currentY}`}
                        style={{ width: '110px' }}
                      />
                    );
                  }

                  const points = getNodePoints(node.id);
                  const isActive = points > 0;
                  const isLocked = totalPoints < node.requiredPoints;
                  const sizeClass = getNodeSizeClass(node.nodeType);
                  const colorClass = getNodeClasses(node, isActive, isLocked);

                  return (
                    <div
                      key={node.id}
                      className="relative flex flex-col items-center justify-center"
                      style={{ width: '110px', height: '50px' }}
                    >
                      {/* 节点本身 */}
                      <div
                        className={`${sizeClass} border-2 flex items-center justify-center cursor-pointer transition-all duration-200 select-none ${colorClass}`}
                        onClick={() => onLeftClick(node, board)}
                        onContextMenu={(e) => onRightClick(e, node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{
                          transform: hoveredNode === node.id ? 'scale(1.1)' : 'scale(1)',
                          boxShadow: isActive
                            ? node.nodeType === 'micro'
                              ? '0 0 10px rgba(59, 130, 246, 0.5)'
                              : node.nodeType === 'medium'
                              ? '0 0 12px rgba(168, 85, 247, 0.5)'
                              : '0 0 14px rgba(245, 158, 11, 0.5)'
                            : 'none',
                        }}
                      >
                        {isActive && (
                          <span className="text-xs font-bold font-mono text-white">{points}</span>
                        )}
                      </div>

                      {/* 点数标签 */}
                      <div className="text-[9px] font-mono text-[#a0a0b0] mt-0.5">
                        {points}/{node.maxPoints}
                      </div>

                      {/* 悬浮提示 */}
                      {hoveredNode === node.id && (
                        <div
                          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0f0f23] border border-[#2a2a4a] rounded-lg px-3 py-2 text-xs shadow-xl max-w-56 whitespace-normal"
                          style={{ minWidth: '200px' }}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-2 bg-[#0f0f23] border-r border-b border-[#2a2a4a] rotate-45 -mb-1" />
                          <div className="font-bold text-[#eaeaea]">{node.nameCN}</div>
                          <div className="text-[#a0a0b0] mt-1">{node.description}</div>
                          <div className="text-[#e94560] font-mono mt-1">
                            {points}/{node.maxPoints}
                          </div>
                          {isLocked && (
                            <div className="text-yellow-400 mt-1">
                              需要投入 {node.requiredPoints} 点解锁
                            </div>
                          )}
                          {!isLocked && points < node.maxPoints && (
                            <div className="text-[#a0a0b0] mt-1">
                              左键加点 / 右键减点
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-4 pt-3 mt-3 border-t border-[#2a2a4a]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/30" />
          <span className="text-xs text-[#a0a0b0]">小型 (3点)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-purple-500 shadow-sm shadow-purple-500/30" />
          <span className="text-xs text-[#a0a0b0]">中型</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-amber-500 shadow-sm shadow-amber-500/30" />
          <span className="text-xs text-[#a0a0b0]">大型 (1点)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#111] border border-[#222] opacity-40" />
          <span className="text-xs text-[#a0a0b0]">未解锁</span>
        </div>
      </div>
    </div>
  );
}

// 主天赋面板
export function TalentPanel() {
  const boards = getAllTalentBoards();
  const {
    loadout,
    setTalentBoards,
    setTalentPoints,
    setCoreTalent,
  } = useBuildStore();

  const selectedBoards = loadout.talentBoards || [];
  const selectedBoardData = boards.filter(b => selectedBoards.includes(b.id));

  // 切换天赋板选择
  const handleToggleBoard = (boardId: string) => {
    const currentSelected = [...(loadout.talentBoards || [])];
    const index = currentSelected.indexOf(boardId);

    if (index !== -1) {
      // 取消选择，移除天赋点
      const board = boards.find(b => b.id === boardId);
      const nodeIdsToRemove = board?.nodes.map(n => n.id) || [];
      const filteredTalents = loadout.talents.filter(t => !nodeIdsToRemove.includes(t.nodeId));
      const filteredCoreTalents = (Array.isArray(loadout.coreTalents) ? loadout.coreTalents : []).filter(
        ct => ct.boardId !== boardId
      );
      setTalentBoards(currentSelected.filter(id => id !== boardId));
      setTalentPoints('', 0); // 这个只是为了触发store更新，我们需要修改更多
      useBuildStore.setState((state) => ({
        loadout: { ...state.loadout, talents: filteredTalents, coreTalents: filteredCoreTalents }
      }));
    } else if (currentSelected.length < 4) {
      // 选择新天赋板
      setTalentBoards([...currentSelected, boardId]);
    }
  };

  // 获取节点点数
  const getNodePoints = (nodeId: string): number => {
    return loadout.talents.find(t => t.nodeId === nodeId)?.points || 0;
  };

  // 获取天赋板总点数
  const getBoardTotalPoints = (board: TalentBoardData): number => {
    return board.nodes.reduce(
      (sum, node) => sum + (loadout.talents.find(t => t.nodeId === node.id)?.points || 0),
      0
    );
  };

  // 天赋加点
  const handleLeftClick = (node: TalentNodeData, board: TalentBoardData) => {
    const current = getNodePoints(node.id);
    if (current >= node.maxPoints) return;
    if (getBoardTotalPoints(board) < node.requiredPoints) return;
    setTalentPoints(node.id, current + 1);
  };

  // 天赋减点
  const handleRightClick = (e: React.MouseEvent, node: TalentNodeData) => {
    e.preventDefault();
    const current = getNodePoints(node.id);
    if (current > 0) {
      setTalentPoints(node.id, current - 1);
    }
  };

  // 核心天赋选择
  const handleCoreSelect = (boardId: string, slotIndex: number, optionId: string | null) => {
    setCoreTalent(boardId, slotIndex, optionId);
  };

  // 计算总点数（所有天赋板）
  const totalUsedPoints = (Array.isArray(loadout.talents) ? loadout.talents : []).reduce(
    (sum, t) => sum + t.points,
    0
  );

  return (
    <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-[#0f0f23] max-h-[calc(100vh-64px)]">
      {/* 标题区域 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#eaeaea]">天赋配置</h2>
        <div className="text-right">
          <span className="text-[#e94560] font-mono font-bold">{totalUsedPoints}</span>
          <span className="text-[#a0a0b0] text-sm"> 已投入总天赋点</span>
        </div>
      </div>

      {/* 天赋板选择 */}
      <TalentBoardSelector
        availableBoards={boards}
        selectedBoards={selectedBoards}
        onToggleBoard={handleToggleBoard}
      />

      {/* 已选择的天赋板视图 */}
      {selectedBoardData.length === 0 ? (
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-8 text-center text-[#a0a0b0]">
          <p className="mb-2">请选择天赋板</p>
          <p className="text-xs opacity-70">支持最多选择4个天赋板</p>
        </div>
      ) : (
        selectedBoardData.map((board) => {
          const boardCoreSelections: Record<number, string> = {};
          const coreTalents = Array.isArray(loadout.coreTalents) ? loadout.coreTalents : [];
          for (const ct of coreTalents) {
            if (ct.boardId === board.id) {
              boardCoreSelections[ct.slotIndex] = ct.optionId;
            }
          }
          return (
            <ErrorBoundary
              key={board.id}
              fallback={
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-center">
                  <p>{board.nameCN} 加载失败</p>
                </div>
              }
            >
              <TalentBoardView
                board={board}
                getNodePoints={getNodePoints}
                getBoardTotalPoints={getBoardTotalPoints}
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
                onCoreSelect={handleCoreSelect}
                boardCoreSelections={boardCoreSelections}
              />
            </ErrorBoundary>
          );
        })
      )}
    </div>
  );
}
