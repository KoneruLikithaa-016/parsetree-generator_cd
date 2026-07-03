function Sidebar({
  clearAll,
  exportPNG,
  darkMode,
  setDarkMode,
}) {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>

      <button onClick={clearAll}>
        🗑 Clear
      </button>

      <button onClick={exportPNG}>
        📥 Export PNG
      </button>

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </aside>
  );
}

export default Sidebar;