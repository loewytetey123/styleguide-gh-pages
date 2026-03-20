# 部署到 GitHub Pages

## 一键部署（推荐）

1. **双击运行** 项目根目录下的 `一键部署.command`
2. 浏览器会打开 Token 创建页，勾选 **repo** 权限，生成后复制 Token
3. 回到终端窗口，粘贴 Token（输入时不显示），按回车
4. 等待完成，1–2 分钟后访问页面

## 访问链接

**https://loewytetey123.github.io/styleguide-gh-pages/ai-design-intel.html**

---

## 手动部署

### 2. 推送代码

```bash
cd /Users/luoxinting/Downloads/styleguide-gh-pages
git push -u origin main
```

密码请使用 [Personal Access Token](https://github.com/settings/tokens)（勾选 `repo`）。

### 3. 启用 Pages

打开 [Pages 设置](https://github.com/loewytetey123/styleguide-gh-pages/settings/pages) → Source 选 **Deploy from a branch** → Branch 选 `main`，Path 选 `/ (root)` → Save
