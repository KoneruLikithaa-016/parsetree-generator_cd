import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 50;

export function getLayoutedElements(nodes, edges) {
  dagreGraph.setGraph({
    rankdir: "TB",
    ranksep: 80,
    nodesep: 60,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const position = dagreGraph.node(node.id);

    node.position = {
      x: position.x - nodeWidth / 2,
      y: position.y - nodeHeight / 2,
    };

    node.style = {
      background: "#2563eb",
      color: "white",
      border: "2px solid white",
      borderRadius: "8px",
      padding: "10px",
      width: 160,
      textAlign: "center",
      fontWeight: "bold",
    };
  });

  return { nodes, edges };
}