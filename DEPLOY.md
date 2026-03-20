# 部署到 GitHub Pages

## 当前状态

- ✅ Git 仓库已初始化
- ✅ 已完成首次提交
- ✅ 已配置远程仓库：`https://github.com/luoxinting/styleguide-gh-pages.git`

## 部署步骤

### 1. 在 GitHub 创建仓库（若尚未创建）

1. 打开 [https://github.com/new](https://github.com/new)
2. 仓库名填写：`styleguide-gh-pages`（或你喜欢的名称）
3. 选择 **Public**
4. **不要**勾选 "Add a README file"
5. 点击 Create repository

### 2. 推送代码

在终端执行：

```bash
cd /Users/luoxinting/Downloads/styleguide-gh-pages

# 若你的 GitHub 用户名不是 luoxinting，请先修改远程地址：
# git remote set-url origin https://github.com/你的用户名/你的仓库名.git

git push -u origin main
```

若使用 HTTPS，推送时会提示输入 GitHub 用户名和密码。密码请使用 [Personal Access Token](https://github.com/settings/tokens)（需勾选 `repo` 权限）。

若已配置 SSH 密钥，可改用：

```bash
git remote set-url origin git@github.com:luoxinting/styleguide-gh-pages.git
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. 在 **Source** 中选择 **Deploy from a branch**
3. **Branch** 选择 `main`，路径选择 `/ (root)`
4. 点击 Save

### 4. 访问页面

部署完成后（约 1–2 分钟），访问：

- **AI 设计情报周报**：`https://luoxinting.github.io/styleguide-gh-pages/ai-design-intel.html`

（将 `luoxinting` 替换为你的 GitHub 用户名）
