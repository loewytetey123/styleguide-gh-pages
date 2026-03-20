// 自动截取 AI 设计工具官网截图的小脚本（Node + Puppeteer）
// 使用说明见文件底部注释。

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

// 这里的列表要和 design-trend-weekly.html 里的 aiTools 保持一致
const tools = [
  {
    name: "Canva – Magic Layers",
    url: "https://www.canva.com/",
    filename: "tool-canva-magic-layers.png",
  },
  {
    name: "Mowgli",
    url: "https://mowgli.ai/",
    filename: "tool-mowgli.png",
  },
  {
    name: "brono",
    url: "http://brono.ai/",
    filename: "tool-brono.png",
  },
  {
    name: "Subframe",
    url: "https://subframe.com/",
    filename: "tool-subframe.png",
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function main() {
  const root = process.cwd();
  const assetsDir = path.join(root, "assets");
  await ensureDir(assetsDir);

  // 统一使用 16:9 视口（例如 1440 x 810），只截首屏区域，避免图片过长
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1440, height: 810 },
  });

  for (const tool of tools) {
    console.log(`\n[截图] ${tool.name} -> ${tool.url}`);
    const page = await browser.newPage();
    try {
      await page.goto(tool.url, {
        waitUntil: "networkidle2",
        timeout: 60_000,
      });

      // 回到页面顶部，专注截取首屏区域
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      // 旧版本 Puppeteer 使用 setTimeout 即可，稍等资源加载稳定
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const outPath = path.join(assetsDir, tool.filename);
      // 只截取当前视口（16:9 首屏），避免生成超长长图
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✅ 已保存：${path.relative(root, outPath)}`);
    } catch (err) {
      console.error(`  ❌ 截图失败：${tool.name}`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\n全部官网截图任务完成。");
}

main().catch((err) => {
  console.error("脚本运行出错：", err);
  process.exit(1);
});

/**
 * 使用步骤：
 * 1. 在项目根目录（包含 design-trend-weekly.html 的目录）打开终端。
 * 2. 初始化 Node 环境并安装 Puppeteer（只需做一次）：
 *    npm init -y
 *    npm install puppeteer
 *
 * 3. 运行截图脚本：
 *    node scripts/capture-tool-screenshots.js
 *
 * 4. 脚本会在 ./assets 下生成：
 *    - tool-canva-magic-layers.png
 *    - tool-mowgli.png
 *    - tool-brono.png
 *    - tool-subframe.png
 *
 * 5. 由于 design-trend-weekly.html 中的 screenshot 字段已经写成：
 *      "./assets/tool-xxxx.png"
 *    生成成功后，无需再改前端代码，刷新页面即可看到官网截图。
 *
 * 如果后续你增加 / 替换新的 AI 工具：
 * - 同时更新本文件最上方的 tools 列表（name/url/filename）
 * - 重新运行脚本，就会自动为新工具生成对应截图。
 */

