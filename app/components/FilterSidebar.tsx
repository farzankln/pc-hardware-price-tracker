"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onChange: (key: string, values: string[]) => void;
  onClear: () => void;
}

export default function FilterSidebar({ groups, selected, onChange, onClear }: FilterSidebarProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(
    groups.reduce((acc, g) => ({ ...acc, [g.title]: true }), {})
  );

  const hasSelection = Object.values(selected).some((arr) => arr.length > 0);

  const toggleGroup = (title: string) => {
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        {hasSelection && (
          <button
            onClick={onClear}
            className="text-xs font-medium text-primary hover:text-primary-hover"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.title} className="border-b border-border pb-4 last:border-0">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex w-full items-center justify-between text-sm font-semibold text-foreground"
            >
              {group.title}
              {open[group.title] ? (
                <X className="h-4 w-4 text-text-muted" />
              ) : (
                <Check className="h-4 w-4 text-text-muted" />
              )}
            </button>
            {open[group.title] && (
              <div className="mt-3 space-y-2">
                {group.options.map((option) => {
                  const isSelected = selected[group.title]?.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-text-secondary"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-border-strong"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isSelected}
                        onChange={(e) => {
                          const current = selected[group.title] || [];
                          if (e.target.checked) {
                            onChange(group.title, [...current, option.value]);
                          } else {
                            onChange(group.title, current.filter((v) => v !== option.value));
                          }
                        }}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
