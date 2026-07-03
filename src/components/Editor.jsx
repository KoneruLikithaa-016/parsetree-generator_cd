import Editor from "@monaco-editor/react";
import { parseCode } from "../utils/parser";

function CodeEditor({
  code,
  setCode,
  setTree,
  darkMode,
}) {
  const handleGenerate = () => {
    try {
      if (!code.trim()) {
        alert("Please enter some code.");
        return;
      }

      const tree = parseCode(code);
      setTree(tree);
    } catch (err) {
      alert(err.message);
      setTree(null);
    }
  };

  return (
    <div className="editor-container">
      <h2>Code Editor</h2>

      <Editor
        height="500px"
        language="c"
        value={code}
        onChange={(value) =>
          setCode(value || "")
        }
        theme={
          darkMode
            ? "vs-dark"
            : "light"
        }
        options={{
          fontSize: 18,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
        }}
      />

      <button
        className="generate-btn"
        onClick={handleGenerate}
      >
        Generate Parse Tree
      </button>
    </div>
  );
}

export default CodeEditor;

