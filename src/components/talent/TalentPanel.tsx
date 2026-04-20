import { useState } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import { getAllTalentBoards, type TalentBoardData, type TalentNodeData } from '@/data/talent-trees/index.ts';

const NODE_COLORS = {
  micro: {
    active: 'bg-blue-500 border-blue-400 shadow-blue-500/50',
    inactive: 'bg-[#1a1a40] border-[#3a3a5a]',
    hover: 'hover:border-blue-400/60',
    locked: 'bg-[#111] border-[#2a2a3a] opacity-50',
  },
  medium: {
    active: 'bg-purple-500 border-purple-400 shadow-purple-500/50',
    inactive: 'bg-[#1a1a40] border-[#3a3a5a]',
    hover: 'hover:border-purple-400/60',
    locked: 'bg-[#111] border-[#2a2a3a] opacity-50',
  },
  legendary: {
    active: 'bg-yellow-500 border-yellow-400 shadow-yellow-500/50',
    inactive: 'bg-[#1a1a40] border-[#3a3a5a]',
    hover: 'hover:border-yellow-400/60',
    locked: 'bg-[#111] border-[#2a2a3a] opacity-50',
  },
};

const NODE_SIZES = {
  micro: 'w-10 h-10',
  medium: 'w-12 h-12',
  legendary: 'w-14 h-14',
};

export function TalentPanel() {
  const boards = getAllTalentBoards();
  const [selectedBoardId, setSelectedBoardId] = useState(boards[0]?.id ?? '');
  const { loadout, setTalentPoints } = useBuildStore();

  const selectedBoard = boards.find(b => b.id === selectedBoardId);

  const getNodePoints = (nodeId: string): number => {
    return loadout.talents.find(t => t.nodeId === nodeId)?.points ?? 0;
  };

  /** 计算当前天赋板上已投入的总点数 */
  const getBoardTotalPoints = (board: TalentBoardData): number => {
    return board.nodes.reduce((sum, node) => {
      return sum + (loadout.talents.find(t => t.nodeId === node.id)?.points ?? 0);
    }, 0);
  };

  const canAllocate = (node: TalentNodeData, board: TalentBoardData): boolean => {
    const current = getNodePoints(node.id);
    if (current >= node.maxPoints) return false;
    // 层级解锁制：需要已投入总点数 >= requiredPoints
    const totalPoints = getBoardTotalPoints(board);
    if (totalPoints < node.requiredPoints) return false;
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

  const totalUsed = loadout.talents.reduce((sum, t) => sum + t.points, 0);
  const totalMax = boards.reduce((sum, board) =>
    sum + board.nodes.reduce((s, n) => s + n.maxPoints, 0), 0);

  return (
    <div className="p-4 space-y-4 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">天赋配置</h2>

      {/* 天赋板选择 */}
      <div className="flex gap-2">
        {boards.map(board => (
          <button
            key={board.id}
            onClick={() => setSelectedBoardId(board.id)}
            className={`flex-1 px-3 py-2 rounded text-sm transition-colors border ${
              selectedBoardId === board.id
                ? 'bg-[#e94560]/20 border-[#e94560] text-[#e94560]'
                : 'bg-[#1a1a40] border-[#3a3a5a] text-[#a0a0a0] hover:border-[#e94560]/50'
            }`}
          >
            <div className="font-medium">{board.nameCN}</div>
            <div className="text-xs opacity-70">{board.description}</div>
          </button>
        ))}
      </div>

      {/* 核心机制提示 */}
      {selectedBoard?.coreMechanic && (
        <div className="bg-[#16213e] border border-[#e94560]/20 rounded-lg px-3 py-2 text-xs text-[#eaeaea]">
          <span className="text-[#e94560] font-bold">核心机制：</span>{selectedBoard.coreMechanic}
        </div>
      )}

      {/* 天赋节点网格 */}
      {selectedBoard && (
        <TalentBoardView
          board={selectedBoard}
          getNodePoints={getNodePoints}
          getBoardTotalPoints={getBoardTotalPoints}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
      )}

      {/* 已用点数 */}
      <div className="flex items-center justify-between bg-[#1a1a40] rounded px-4 py-2">
        <span className="text-sm text-[#a0a0a0]">已用天赋点数</span>
        <span className="font-mono text-sm">
          <span className="text-[#e94560]">{totalUsed}</span>
          <span className="text-[#a0a0a0]"> / {totalMax}</span>
        </span>
      </div>
    </div>
  );
}

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

  // Compute grid dimensions
  const maxX = Math.max(...board.nodes.map(n => n.x));
  const maxY = Math.max(...board.nodes.map(n => n.y));

  return (
    <div className="bg-[#1a1a40] rounded-lg p-6 relative">
      {/* 节点网格 */}
      <div
        className="relative grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${maxX + 1}, 1fr)`,
          gridTemplateRows: `repeat(${maxY + 1}, 1fr)`,
          zIndex: 1,
        }}
      >
        {Array.from({ length: (maxX + 1) * (maxY + 1) }, (_, idx) => {
          const x = idx % (maxX + 1);
          const y = Math.floor(idx / (maxX + 1));
          const node = board.nodes.find(n => n.x === x && n.y === y);

          if (!node) return <div key={idx} />;

          const points = getNodePoints(node.id);
          const isActive = points > 0;
          const isLocked = totalPoints < node.requiredPoints;
          const isHovered = hoveredNode === node.id;
          const colors = NODE_COLORS[node.nodeType];
          const size = NODE_SIZES[node.nodeType];

          const bgClass = isLocked
            ? colors.locked
            : isActive
              ? `${colors.active} shadow-lg`
              : `${colors.inactive} ${colors.hover}`;

          return (
            <div key={node.id} className="flex items-center justify-center">
              <div
                className={`${size} rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${bgClass}`}
                onClick={() => onLeftClick(node, board)}
                onContextMenu={(e) => onRightClick(e, node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                title={`${node.nameCN}: ${node.description}\n左键加点，右键减点\n${points}/${node.maxPoints}${isLocked ? ` (需要${node.requiredPoints}点解锁)` : ''}`}
              >
                <span className="text-xs font-bold font-mono text-white">
                  {points > 0 ? points : ''}
                </span>
              </div>

              {/* 悬浮提示 */}
              {isHovered && (
                <div className="absolute z-50 bg-[#0f3460] border border-[#e94560]/30 rounded-lg px-3 py-2 text-sm shadow-xl max-w-48">
                  <div className="font-bold text-white">{node.nameCN}</div>
                  <div className="text-xs text-[#a0a0a0] mt-1">{node.description}</div>
                  <div className="text-xs text-[#e94560] font-mono mt-1">
                    {points}/{node.maxPoints}
                  </div>
                  {isLocked && (
                    <div className="text-xs text-yellow-400 mt-1">
                      需要投入 {node.requiredPoints} 点解锁
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 图例 */}
      <div className="flex gap-4 mt-4 text-xs text-[#a0a0a0]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>基础</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span>进阶</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>核心</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#111] border border-[#2a2a3a] opacity-50" />
          <span>未解锁</span>
        </div>
      </div>
    </div>
  );
}
