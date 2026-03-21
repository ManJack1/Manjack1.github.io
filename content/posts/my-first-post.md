+++
title = "My first post"
author = ["罗耀辉"]
lastmod = 2026-03-21T19:18:50+08:00
tags = ["tag1"]
categories = ["category1"]
draft = false
+++

This is my post body

Emacs 基础设置配置。

```emacs-lisp
;;; init.el --- Emacs 基本配置
;;; Commentary:
;; 一个简洁实用的 Emacs 配置文件(使用 straight.el)

;;; Code:

;; 启动界面
(setq inhibit-startup-message t)
(add-hook 'prog-mode-hook #'display-line-numbers-mode)
(add-hook 'text-mode-hook #'display-line-numbers-mode)
(add-hook 'conf-mode-hook #'display-line-numbers-mode)
(column-number-mode t)
(global-hl-line-mode t)
(show-paren-mode t)
(electric-pair-mode t)
(delete-selection-mode 1)
;; 界面
(tool-bar-mode -1)
(menu-bar-mode -1)
(scroll-bar-mode -1)

;; 编辑
(setq-default indent-tabs-mode nil)
(setq-default tab-width 4)
(setq c-basic-offset 4)

;; 备份
(setq backup-directory-alist '(("." . "~/.emacs.d/backups")))
(setq auto-save-file-name-transforms '((".*" "~/.emacs.d/auto-save-list/" t)))

;; 滚动
(setq scroll-step 1 scroll-conservatively 10000)
(global-auto-revert-mode t)

;; 历史
(save-place-mode t)
(recentf-mode t)
(setq recentf-max-saved-items 50)
(global-visual-line-mode 1)

;; 声音
(setq ring-bell-function 'ignore visible-bell t)

;; 编码
(prefer-coding-system 'utf-8)
(set-default-coding-systems 'utf-8)
(set-terminal-coding-system 'utf-8)
(set-keyboard-coding-system 'utf-8)
```
