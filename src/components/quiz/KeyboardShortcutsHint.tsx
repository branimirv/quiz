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
    <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
      {shortcuts.map((shortcut) => (
        <span key={shortcut.key} className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-300 font-mono">
            {shortcut.key}
          </kbd>
          <span>{shortcut.label}</span>
        </span>
      ))}
    </div>
  );
}
