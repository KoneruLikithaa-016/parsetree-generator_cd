import { getLayoutedElements } from "./layout";

export function parseCode(code) {
  code = code.replace(";", "").trim();

  const match = code.match(
    /(?:int|float|double|char)?\s*([a-zA-Z_]\w*)\s*=\s*(.+)/
  );

  if (!match) {
    throw new Error("Invalid assignment statement.");
  }

  const variable = match[1];
  const expression = match[2];

  const tokens = expression.match(/[a-zA-Z_]\w*|\d+|[()+\-*/]/g);

  if (!tokens) {
    throw new Error("Invalid expression.");
  }

  let index = 0;

  function factor() {
    if (tokens[index] === "(") {
      index++;
      const node = expressionRule();

      if (tokens[index] !== ")") {
        throw new Error("Missing closing parenthesis.");
      }

      index++;
      return node;
    }

    return {
      value: tokens[index++],
    };
  }

  function term() {
    let node = factor();

    while (
      index < tokens.length &&
      (tokens[index] === "*" || tokens[index] === "/")
    ) {
      const op = tokens[index++];

      node = {
        value: op,
        left: node,
        right: factor(),
      };
    }

    return node;
  }

  function expressionRule() {
    let node = term();

    while (
      index < tokens.length &&
      (tokens[index] === "+" || tokens[index] === "-")
    ) {
      const op = tokens[index++];

      node = {
        value: op,
        left: node,
        right: term(),
      };
    }

    return node;
  }

  const root = {
    value: "=",
    left: {
      value: variable,
    },
    right: expressionRule(),
  };

  const nodes = [];
  const edges = [];

  let id = 0;

  function build(node, parent = null) {
    const currentId = `${id++}`;

    nodes.push({
      id: currentId,
      data: {
        label: node.value,
      },
      position: {
        x: 0,
        y: 0,
      },
    });

    if (parent !== null) {
      edges.push({
        id: `e${parent}-${currentId}`,
        source: parent,
        target: currentId,
      });
    }

    if (node.left) build(node.left, currentId);
    if (node.right) build(node.right, currentId);
  }

  build(root);

  return getLayoutedElements(nodes, edges);
}

