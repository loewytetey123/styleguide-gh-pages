#!/bin/bash
cd "$(dirname "$0")"

echo "=========================================="
echo "  AI 设计情报周报 - 部署到 GitHub Pages"
echo "=========================================="
echo ""

# 检查是否已配置 token
if [ -z "$GITHUB_TOKEN" ]; then
  echo "请先创建 GitHub Token："
  echo "1. 已为你打开浏览器"
  open "https://github.com/settings/tokens/new?description=deploy&scopes=repo" 2>/dev/null || true
  echo "2. 点击「Generate new token (classic)」，勾选 repo，生成后复制"
  echo "3. 粘贴到下方（输入时不会显示，按回车执行）："
  echo ""
  read -s -p "请粘贴 Token: " GITHUB_TOKEN
  echo ""
  if [ -z "$GITHUB_TOKEN" ]; then
    echo "未输入 Token，退出"
    read -p "按回车键关闭..."
    exit 1
  fi
fi

echo "正在推送到 GitHub..."
if git push https://loewytetey123:${GITHUB_TOKEN}@github.com/loewytetey123/styleguide-gh-pages.git main; then
  echo ""
  echo "推送成功！正在启用 GitHub Pages..."
  curl -s -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    https://api.github.com/repos/loewytetey123/styleguide-gh-pages/pages \
    -d '{"source":{"branch":"main","path":"/"}}' 2>/dev/null && echo "Pages 已启用" || echo "请手动启用 Pages（见下方链接）"
  echo ""
  echo "=========================================="
  echo "  部署完成！1-2 分钟后访问："
  echo "  https://loewytetey123.github.io/styleguide-gh-pages/ai-design-intel.html"
  echo "=========================================="
else
  echo ""
  echo "推送失败，请检查 Token 是否正确（需勾选 repo 权限）"
fi

echo ""
read -p "按回车键关闭..."
