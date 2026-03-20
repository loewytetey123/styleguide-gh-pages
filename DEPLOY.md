# 部署到 GitHub Pages

## 当前状态

- ✅ Git 仓库已初始化
- ✅ 已完成首次提交
- ✅ 已配置远程仓库：`https://github.com/loewytetey123/styleguide-gh-pages.git`

## 部署步骤

### 2. 推送代码

在终端执行：

```bash
cd /Users/luoxinting/Downloads/styleguide-gh-pages
git push -u origin main
```

若使用 HTTPS，推送时会提示输入 GitHub 用户名和密码。**密码请使用 [Personal Access Token](https://github.com/settings/tokens)**（需勾选 `repo` 权限），不要用登录密码。

### 3. 启用 GitHub Pages

1. 打开 [https://github.com/loewytetey123/styleguide-gh-pages/settings/pages](https://github.com/loewytetey123/styleguide-gh-pages/settings/pages)
2. 在 **Source** 中选择 **Deploy from a branch**
3. **Branch** 选择 `main`，路径选择 `/ (root)`
4. 点击 Save

### 4. 访问页面

部署完成后（约 1–2 分钟），访问：

- **AI 设计情报周报**：https://loewytetey123.github.io/styleguide-gh-pages/ai-design-intel.html
