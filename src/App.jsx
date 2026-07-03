import "./App.css";
import { useState } from "react";
import { toPng } from "html-to-image";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/Editor";
import TreeView from "./components/TreeView";

function App() {
  const [tree, setTree] = useState(null);
  const [code, setCode] = useState("int a = b + c;");
  const [darkMode, setDarkMode] = useState(true);

  // Clear editor and tree
  const clearAll = () => {
    setCode("");
    setTree(null);
  };

  // Export parse tree as PNG
  const exportPNG = async () => {
    const node = document.getElementById("tree-view");

    console.log("Tree Element:", node);

    if (!node) {
      alert("Parse tree not found!");
      return;
    }

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: darkMode ? "#202020" : "#ffffff",
      });

      const link = document.createElement("a");
      link.download = "parse-tree.png";
      link.href = dataUrl;
      link.click();

      console.log("PNG Generated Successfully");
    } catch (error) {
      console.error("Export Error:", error);
      alert("Export failed. Check browser console (F12).");
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Header />

      <div className="main">
        <Sidebar
          clearAll={clearAll}
          exportPNG={exportPNG}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <CodeEditor
          code={code}
          setCode={setCode}
          setTree={setTree}
          darkMode={darkMode}
        />

        <TreeView
          tree={tree}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
