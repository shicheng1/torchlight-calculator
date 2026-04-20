import { useState } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import {
  getAllTalentBoards,
  type TalentBoardData,
  type TalentNodeData,
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

// 天赋板选择卡片组件
function TalentBoardCard({
  board,
  isSelected,
  isSelectable,
  onToggle,
}: {
  board: TalentBoardData;
  isSelected: boolean;
  isSelectable: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={!isSelected && !isSelectable}
      className={`p-4 rounded-lg border-2 text-left transition-all relative overflow-hidden ${
        isSelected
          ? 'bg-[#1a1a2e] border-[#e94560] text-[#eaeaea] shadow-lg shadow-[#e94560]/20'
          : isSelectable
          ? 'bg-[#0f0f23] border-[#2a2a4a] text-[#a0a0b0] hover:border-[#e94560]/50 hover:text-[#eaeaea]'
          : 'bg-[#0a0a14] border-[#1a1a2a] text-[#505060] opacity-50 cursor-not-allowed'
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-[#e94560] rounded-full flex items-center justify-center">
          <span className="text-[8px]">✓</span>
        </div>
      )}
      <div className="font-bold text-base mb-1">{board.nameCN}</div>
      <div className="text-xs opacity-75 mb-2">{board.description}</div>
      {board.coreMechanic && (
        <div className="text-[10px] text-[#808090] bg-[#0f0f23] rounded px-2 py-1">
          {board.coreMechanic}
        </div>
      )}
    </button>
  );
}

// 单个天赋板的天赋树
function TalentBoardView({
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

  const nodes = board.nodes;
  const minY = Math.min(...nodes.map(n => n.y));
  const maxY = Math.max(...nodes.map(n => n.y));
  const minX = Math.min(...nodes.map(n => n.x));
  const maxX = Math.max(...nodes.map(n => n.x));

  const numTiers = maxY - minY + 1;
  const numRows = maxX - minX + 1;

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-5">
      {/* 标题和点数统计 */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a4a]">
        <div>
          <h3 className="text-lg font-bold text-[#eaeaea]">{board.nameCN}</h3>
          {board.coreMechanic && (
            <p className="text-xs text-[#a0a0b0] mt-1">{board.coreMechanic}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-[#e94560] font-mono font-bold text-xl">{totalPoints}</div>
          <div className="text-[#a0a0b0] text-xs">已投入</div>
        </div>
      </div>

      {/* 核心天赋选择区域 */}
      {board.coreSlots && board.coreSlots.length > 0 && (
        <div className="mb-5 p-4 bg-[#0f0f23] rounded-lg border border-[#2a2a4a]">
          <h4 className="text-sm font-medium text-[#eaeaea] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e94560] rounded-full"></span>
            核心天赋
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {board.coreSlots.map((slot, slotIndex) => {
              const isLocked = totalPoints < slot.unlockPoints;
              const selectedOptionId = useBuildStore.getState().loadout.coreTalents.find(
                ct => ct.boardId === board.id && ct.slotIndex === slotIndex
              )?.optionId;

              return (
                <div key={slotIndex}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#eaeaea]">
                      核心天赋 {slotIndex === 0 ? 'I' : 'II'}
                    </span>
                    <span className="text-xs px-3 py-0.5 rounded-full bg-[#1a1a3a] text-[#a0a0b0] border border-[#3a3a5a]">
                      {slot.unlockPoints}点解锁
                    </span>
                  </div>
                  {isLocked ? (
                    <div className="flex items-center justify-center py-4 text-[#a0a0b0] text-xs">
                      <span className="opacity-60">🔒 已锁定</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {slot.options.map((option) => {
                        const isSelected = selectedOptionId === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              useBuildStore.getState().setCoreTalent(
                                board.id,
                                slotIndex,
                                isSelected ? null : option.id
                              );
                              setHoveredNode(null);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border-2 text-xs transition-all text-left ${
                              isSelected
                                ? 'bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-500 text-[#eaeaea] shadow-sm shadow-amber-500/20'
                                : 'bg-[#1a1a3a] border-[#3a3a5a] hover:border-amber-500/50 text-[#a0a0b0] hover:text-[#eaeaea]'
                            }`}
                          >
                            <div className="font-medium mb-1 text-sm">{option.nameCN}</div>
                            <div className="opacity-80 leading-tight">{option.description}</div>
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
      <div className="relative overflow-x-auto pb-2">
        <div
          className="flex flex-col-reverse items-start gap-1 py-3"
          style={{ width: `${numTiers * 120}px` }}
        >
          {Array.from({ length: numRows }).map((_, rowIdx) => {
            const currentX = minX + rowIdx;
            const rowNodes = nodes.filter(n => n.x === currentX);

            return (
              <div
                key={`row-${currentX}`}
                className="flex items-center justify-start gap-1"
                style={{ width: `${numTiers * 120}px`, minHeight: '55px' }}
              >
                {Array.from({ length: numTiers }).map((_, tierIdx) => {
                  const currentY = minY + tierIdx;
                  const node = rowNodes.find(n => n.y === currentY);

                  if (!node) {
                    return (
                      <div
                        key={`empty-${currentX}-${currentY}`}
                        style={{ width: '120px' }}
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
                      style={{ width: '120px', height: '55px' }}
                    >
                      {/* 节点本身 */}
                      <div
                        className={`${sizeClass} border-2 flex items-center justify-center cursor-pointer transition-all duration-200 select-none ${colorClass}`}
                        onClick={() => !isLocked && onLeftClick(node, board)}
                        onContextMenu={(e) => !isLocked && onRightClick(e, node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{
                          transform: hoveredNode === node.id ? 'scale(1.15)' : 'scale(1)',
                          boxShadow: isActive
                            ? node.nodeType === 'micro'
                            ? '0 0 12px rgba(59, 130, 246, 0.5)'
                            : node.nodeType === 'medium'
                            ? '0 0 14px rgba(168, 85, 247, 0.5)'
                            : '0 0 16px rgba(245, 158, 11, 0.5)'
                            : 'none',
                        }}
                      >
                        {isActive && (
                          <span className="text-xs font-bold font-mono text-white">{points}</span>
                        )}
                      </div>

                      {/* 点数标签 */}
                      <div className="text-[9px] font-mono text-[#a0a0b0] mt-1">
                        {points}/{node.maxPoints}
                      </div>

                      {/* 悬浮提示 */}
                      {hoveredNode === node.id && (
                        <div
                          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0f0f23] border border-[#2a2a4a] rounded-lg px-4 py-3 text-xs shadow-2xl max-w-64 whitespace-normal"
                          style={{ minWidth: '240px' }}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 bg-[#0f0f23] border-r border-b border-[#2a2a4a] rotate-45 -mb-1.5"></div>
                          <div className="font-bold text-[#eaeaea] mb-2 text-sm">{node.nameCN}</div>
                          <div className="text-[#a0a0b0] mb-2 leading-relaxed">{node.description}</div>
                          <div className="text-[#e94560] font-mono text-sm mb-2">
                            当前: {points}/{node.maxPoints}
                          </div>
                          {isLocked && (
                            <div className="text-yellow-400 text-xs mb-2">
                              需要投入 {node.requiredPoints} 点解锁
                            </div>
                          )}
                          {!isLocked && points < node.maxPoints && (
                            <div className="text-[#707080] text-xs">
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
      <div className="flex flex-wrap gap-5 pt-4 mt-4 border-t border-[#2a2a4a]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm shadow-blue-500/30"></div>
          <span className="text-xs text-[#a0a0b0]">小型天赋</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500 shadow-sm shadow-purple-500/30"></div>
          <span className="text-xs text-[#a0a0b0]">中型天赋</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500 shadow-sm shadow-amber-500/30"></div>
          <span className="text-xs text-[#a0a0b0]">大型/传奇天赋</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#111] border border-[#222] opacity-40"></div>
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
    setTalentBoardsWithCleanup,
    setTalentPoints,
  } = useBuildStore();

  const selectedBoards = loadout.talentBoards || [];
  const selectedBoardData = boards.filter(b => selectedBoards.includes(b.id));

  // 切换天赋板选择
  const handleToggleBoard = (boardId: string) => {
    const currentSelected = [...(loadout.talentBoards || [])];
    const index = currentSelected.indexOf(boardId);

    if (index !== -1) {
      // 取消选择
      setTalentBoardsWithCleanup(
        currentSelected.filter(id => id !== boardId),
        boardId
      );
    } else if (currentSelected.length < 4) {
      // 选择新天赋板
      setTalentBoardsWithCleanup([...currentSelected, boardId]);
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

  // 计算总点数（所有天赋板）
  const totalUsedPoints = (Array.isArray(loadout.talents) ? loadout.talents : []).reduce(
    (sum, t) => sum + t.points,
    0
  );

  return (
    <div className="p-5 space-y-5 overflow-y-auto flex-1 bg-[#0f0f23] max-h-[calc(100vh-64px)]">
      {/* 标题区域 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#eaeaea] flex items-center gap-2">
            <span className="w-3 h-3 bg-[#e94560] rounded-full"></span>
            天赋配置
          </h2>
          <p className="text-xs text-[#707080] mt-1">
            选择最多 4 个天赋板，分配天赋点
          </p>
        </div>
        <div className="text-right bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-4 py-2">
          <div className="text-[#e94560] font-mono font-bold text-2xl">{totalUsedPoints}</div>
          <div className="text-[#a0a0b0] text-xs">总投入点数</div>
        </div>
      </div>

      {/* 天赋板选择区域 */}
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#eaeaea] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e94560] rounded-full"></span>
            天赋板选择
            <span className="text-xs text-[#707080] font-normal ml-2">
              ({selectedBoards.length}/4 已选择)
            </span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <TalentBoardCard
              key={board.id}
              board={board}
              isSelected={selectedBoards.includes(board.id)}
              isSelectable={selectedBoards.length < 4 || selectedBoards.includes(board.id)}
              onToggle={() => handleToggleBoard(board.id)}
            />
          ))}
        </div>
      </div>

      {/* 已选择的天赋板视图 */}
      {selectedBoardData.length === 0 ? (
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-10 text-center">
          <div className="text-4xl mb-4 opacity-30">🎯</div>
          <p className="text-[#a0a0b0] text-lg mb-2">请先选择天赋板</p>
          <p className="text-[#707080] text-sm">在上方选择最多 4 个天赋板开始配置</p>
        </div>
      ) : (
        <div className="space-y-6">
          {selectedBoardData.map((board) => (
            <ErrorBoundary
              key={board.id}
              fallback={
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-200 text-center">
                  <p className="font-medium mb-1">{board.nameCN} 加载失败</p>
                  <p className="text-xs opacity-70">请刷新页面重试</p>
                </div>
              }
            >
              <TalentBoardView
                board={board}
                getNodePoints={getNodePoints}
                getBoardTotalPoints={getBoardTotalPoints}
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
              />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </div>
  );
}
