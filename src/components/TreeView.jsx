import ReactFlow, {
  MiniMap,
  Controls,
  Background,
} from "reactflow";

import "reactflow/dist/style.css";

function TreeView({ tree, darkMode }) {
  return (
    <div className="tree-container">
      <h2>Parse Tree</h2>

      <div
        id="tree-view"
        style={{
          width: "100%",
          height: "90%",
          background: darkMode ? "#202020" : "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <ReactFlow
          nodes={tree ? tree.nodes : []}
          edges={tree ? tree.edges : []}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <MiniMap />
          <Controls showInteractive={false} />
          <Background
            gap={20}
            size={1}
            color={darkMode ? "#555" : "#ccc"}
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default TreeView;