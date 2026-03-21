# GitHub Pages 部署指南

## 步骤 1: 初始化 Git 仓库（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit: Hugo blog with Archie theme"
```

## 步骤 2: 连接到你的 GitHub 仓库

```bash
# 添加远程仓库
git remote add origin https://github.com/ManJack1/Manjack1.github.io.git

# 推送到主分支
git branch -M main
git push -u origin main
```

## 步骤 3: 在 GitHub 上启用 Pages

1. 访问你的仓库: https://github.com/ManJack1/Manjack1.github.io
2. 点击 **Settings** (设置)
3. 在左侧菜单中点击 **Pages**
4. 在 **Source** (源) 下选择 **GitHub Actions**

## 步骤 4: 推送更改触发自动部署

每次你推送更改到 `main` 分支时，GitHub Actions 会自动：
1. 构建你的 Hugo 网站
2. 部署到 GitHub Pages

```bash
# 做出更改后
git add .
git commit -m "Update content"
git push
```

## 步骤 5: 访问你的网站

部署完成后，你的网站将在以下地址可用：
**https://manjack1.github.io/**

## 工作流程

### 创建新文章

1. 在 Emacs 中创建新的 `.org` 文件:
   ```bash
   emacs content/posts/my-new-post.org
   ```

2. 添加前置信息:
   ```org
   #+TITLE: 我的新文章
   #+DATE: 2026-03-21
   #+DRAFT: false
   #+TAGS: hugo blogging

   * 内容开始

   在这里写你的文章内容...
   ```

3. 本地预览:
   ```bash
   hugo server -D
   ```
   访问 http://localhost:1313 查看预览

4. 提交并推送:
   ```bash
   git add .
   git commit -m "Add new post: my-new-post"
   git push
   ```

### 配置自定义域名（可选）

如果你想使用自定义域名（如 blog.example.com）：

1. 在仓库根目录创建 `static/CNAME` 文件:
   ```bash
   echo "blog.example.com" > static/CNAME
   ```

2. 在你的域名 DNS 设置中添加 CNAME 记录指向 `manjack1.github.io`

3. 在 `hugo.toml` 中更新 `baseURL`:
   ```toml
   baseURL = 'https://blog.example.com/'
   ```

## 故障排查

### 检查部署状态

1. 访问仓库的 **Actions** 标签页
2. 查看最新的工作流运行
3. 如果失败，点击查看详细日志

### 常见问题

**问题**: 网站显示 404
**解决**: 确保在 GitHub Settings > Pages 中选择了 "GitHub Actions" 作为源

**问题**: 样式没有加载
**解决**: 检查 `hugo.toml` 中的 `baseURL` 设置是否正确

**问题**: 部署失败
**解决**: 查看 Actions 日志，确保所有依赖正确安装

## 有用的命令

```bash
# 本地预览（包括草稿）
hugo server -D

# 构建生产版本
hugo --minify

# 创建新文章
hugo new posts/my-post.md

# 查看 Hugo 版本
hugo version

# 清理构建缓存
hugo --cleanDestinationDir
```

## 资源

- [Hugo 文档](https://gohugo.io/documentation/)
- [Archie 主题文档](https://github.com/athul/archie)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
