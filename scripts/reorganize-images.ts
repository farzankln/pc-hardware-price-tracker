import { renameSync, mkdirSync } from "fs";
import { products } from "../app/data/mock-products";

const imgDir = "public/img";

products.forEach((product) => {
  const oldName = `${product.name}.webp`;
  const oldPath = `${imgDir}/${oldName}`;
  const categoryDir = `${imgDir}/${product.category}`;
  const newPath = `${categoryDir}/${product.id}.webp`;
  
  mkdirSync(categoryDir, { recursive: true });
  
  try {
    renameSync(oldPath, newPath);
    console.log(`Moved ${oldName} -> ${product.category}/${product.id}.webp`);
  } catch (err) {
    console.log(`Skipped ${oldName}: ${err}`);
  }
});

console.log("\nDone reorganizing images");
