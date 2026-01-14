interface Shortcut {
  key: string;
  label: string;
}

interface KeyboardShortcutsHintProps {
  shortcuts?: Shortcut[];
}

const defaultShortcuts: Shortcut[] = [
  { key: "←", label: "Previous" },
  { key: "→", label: "Next" },
  { key: "Space", label: "Reveal" },
  { key: "Esc", label: "Exit" },
];

export function KeyboardShortcutsHint({
  shortcuts = defaultShortcuts,
}: KeyboardShortcutsHintProps) {
  return (
    <div className="grid grid-cols-2 md:flex md:items-center md:justify-center gap-3 md:gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
      {shortcuts.map((shortcut) => (
        <span
          key={shortcut.key}
          className="flex items-center gap-1.5 justify-center md:justify-start"
        >
          <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-300 font-mono text-xs">
            {shortcut.key}
          </kbd>
          <span className="text-xs">{shortcut.label}</span>
        </span>
      ))}
    </div>
  );
}
