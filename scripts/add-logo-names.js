#!/usr/bin/env node
/**
 * 为 toolUpdates 和 officialUpdates 添加 logoName 字段
 * logoName = title 中第一个 ： 或 : 之前的部分，过长则用 author
 */
const fs = require("fs");
const path = require("path");

function getLogoName(item) {
  const t = String(item.title || "");
  const m = t.match(/^([^：:]+)/);
  const part = m ? m[1].trim() : t;
  if (part.length > 16) {
    return item.author || part.slice(0, 14) + "…";
  }
  return part || item.author || "";
}

function processFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let changed = false;

  for (const arr of ["toolUpdates", "officialUpdates"]) {
    if (!Array.isArray(data[arr])) continue;
    for (const item of data[arr]) {
      if (item.category === "plugin") continue; // 插件用 icon
      const name = getLogoName(item);
      if (name && !item.logoName) {
        item.logoName = name;
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log("Updated:", filePath);
  }
}

const dataDir = path.join(__dirname, "../data");
for (const f of fs.readdirSync(dataDir)) {
  if (f.endsWith(".json")) {
    processFile(path.join(dataDir, f));
  }
}
