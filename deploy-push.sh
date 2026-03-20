#!/bin/bash
# 用法: GITHUB_TOKEN=你的token ./deploy-push.sh
# 或在下方填入 token 后执行: ./deploy-push.sh

set -e
cd "$(dirname "$0")"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "请设置 GITHUB_TOKEN 环境变量，或编辑此脚本填入 token"
  echo "创建 Token: https://github.com/settings/tokens (勾选 repo)"
  exit 1
fi

echo "正在推送..."
git push https://loewytetey123:${GITHUB_TOKEN}@github.com/loewytetey123/styleguide-gh-pages.git main

echo "正在启用 GitHub Pages..."
curl -s -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  https://api.github.com/repos/loewytetey123/styleguide-gh-pages/pages \
  -d '{"source":{"branch":"main","path":"/"}}' 2>/dev/null || true

echo ""
echo "完成！1-2 分钟后访问："
echo "https://loewytetey123.github.io/styleguide-gh-pages/ai-design-intel.html"
