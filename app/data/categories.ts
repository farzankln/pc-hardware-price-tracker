export const categories = [
  { name: "CPU", slug: "cpu" },
  { name: "GPU", slug: "gpu" },
  { name: "RAM", slug: "ram" },
  { name: "SSD", slug: "ssd" },
  { name: "HDD", slug: "hdd" },
  { name: "Motherboard", slug: "motherboard" },
  { name: "Power Supply", slug: "power-supply" },
  { name: "Case", slug: "case" },
  { name: "Cooler", slug: "cooler" },
  { name: "Monitor", slug: "monitor" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
