import { readFileSync, writeFileSync } from "fs";

const filePath = "app/data/mock-products.ts";
const content = readFileSync(filePath, "utf-8");

const lines = content.split("\n");
const updatedLines: string[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('imageUrl: "/img/') && line.includes('.svg"')) {
    const svgPathMatch = line.match(/imageUrl: "(\/img\/[^"]+\.svg)"/);
    if (svgPathMatch) {
      const svgPath = svgPathMatch[1];
      const webpPath = svgPath.replace(".svg", ".webp");
      updatedLines.push(`    imageUrl: "${webpPath}",`);
      continue;
    }
  }
  
  if (line.includes('fallbackImageUrl: "https://placehold.co/600x400/EEE/31343C?text=')) {
    updatedLines.push(line);
    continue;
  }
  
  updatedLines.push(line);
}

writeFileSync(filePath, updatedLines.join("\n"));
console.log("Updated mock-products.ts to use .webp paths");
