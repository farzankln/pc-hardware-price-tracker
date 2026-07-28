import { readFileSync, writeFileSync } from "fs";

const filePath = "app/data/mock-products.ts";
const content = readFileSync(filePath, "utf-8");

const lines = content.split("\n");
const updatedLines: string[] = [];
let inProduct = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes("id:") && inProduct === false) {
    inProduct = true;
  }
  
  if (line.includes('imageUrl: "https://placehold.co/600x400/EEE/31343C?text=') && inProduct) {
    const textMatch = line.match(/text=([^"]+)"/);
    const categoryMatch = lines.slice(Math.max(0, i - 10), i).reverse().find(l => l.includes('category:'));
    const idMatch = lines.slice(Math.max(0, i - 10), i).reverse().find(l => l.includes('id:'));
    
    if (textMatch) {
      const text = textMatch[1];
      const catMatch = categoryMatch?.match(/"([^"]+)"/);
      const idVal = idMatch?.match(/"([^"]+)"/);
      
      if (catMatch && idVal) {
        const category = catMatch[1];
        const id = idVal[1];
        updatedLines.push(`    imageUrl: "/img/${category}/${id}.svg",`);
        updatedLines.push(`    fallbackImageUrl: "https://placehold.co/600x400/EEE/31343C?text=${text}",`);
        continue;
      }
    }
  }
  
  updatedLines.push(line);
}

writeFileSync(filePath, updatedLines.join("\n"));
console.log("Updated mock-products.ts with local image paths and fallbacks");
