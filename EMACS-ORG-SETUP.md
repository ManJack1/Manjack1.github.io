# Emacs Org Mode Integration with Hugo

This guide explains how to use Emacs Org mode to write blog posts for your Hugo site.

## Method 1: Using ox-hugo (Recommended)

`ox-hugo` is an Emacs package that exports Org mode files to Hugo-compatible Markdown.

### Installation

Add to your Emacs configuration:

```elisp
;; Install ox-hugo using use-package
(use-package ox-hugo
  :ensure t
  :after ox)

;; Or using straight.el
(use-package ox-hugo
  :straight t
  :after ox)
```

### Usage with ox-hugo

Create an Org file in `content-org/` directory:

```org
#+HUGO_BASE_DIR: ../
#+HUGO_SECTION: posts

* My Blog Post
:PROPERTIES:
:EXPORT_FILE_NAME: my-blog-post
:EXPORT_DATE: 2026-03-21
:END:

This is the content of my blog post.

** A Subsection

More content here.
```

Export with `C-c C-e H H` (or `M-x org-hugo-export-to-md`)

### One-post-per-file approach

```org
#+TITLE: My Post Title
#+HUGO_BASE_DIR: ../
#+HUGO_SECTION: posts
#+DATE: 2026-03-21
#+DRAFT: false

* Content goes here

This is my blog post content.
```

## Method 2: Native Hugo Org Support (Current Setup)

Hugo has built-in support for Org files. You can write `.org` files directly in the `content/` directory.

### File Structure

Place your Org files in `content/posts/`:

```
content/
└── posts/
    ├── my-post.org
    └── another-post.org
```

### Front Matter Format

Use Org properties for front matter:

```org
#+TITLE: My Post Title
#+DATE: 2026-03-21
#+DRAFT: false
#+TAGS: hugo blogging

* Your content starts here

Write your blog post content using Org syntax.
```

### Org Syntax Support

Hugo supports most Org mode features:

- **Headings**: `* Level 1`, `** Level 2`, etc.
- **Bold/Italic**: `*bold*`, `/italic/`, `_underline_`
- **Lists**:
  - Unordered: `- item`
  - Ordered: `1. item`
- **Links**: `[[url][description]]`
- **Images**: `[[file:image.png]]`
- **Code blocks**:
  ```org
  #+BEGIN_SRC python
  def hello():
      print("Hello, World!")
  #+END_SRC
  ```
- **Tables**:
  ```org
  | Header 1 | Header 2 |
  |----------+----------|
  | Cell 1   | Cell 2   |
  ```

## Recommended Workflow

1. **Create a new post**:
   ```bash
   touch content/posts/my-new-post.org
   ```

2. **Edit in Emacs**:
   ```
   emacs content/posts/my-new-post.org
   ```

3. **Add front matter**:
   ```org
   #+TITLE: My New Post
   #+DATE: 2026-03-21
   #+DRAFT: false
   #+TAGS: tag1 tag2
   ```

4. **Write your content** using Org syntax

5. **Preview locally**:
   ```bash
   hugo server -D
   ```

6. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new post"
   git push
   ```

## Emacs Configuration Tips

Add these to your Emacs config for better Hugo+Org experience:

```elisp
;; Set default hugo directory
(setq hugo-base-dir "~/blog/")

;; Function to create new Hugo post
(defun hugo-new-post (title)
  "Create a new Hugo post with TITLE in Org format."
  (interactive "sPost title: ")
  (let* ((slug (downcase (replace-regexp-in-string " " "-" title)))
         (filename (format "%scontent/posts/%s.org" hugo-base-dir slug)))
    (find-file filename)
    (insert (format "#+TITLE: %s\n" title))
    (insert (format "#+DATE: %s\n" (format-time-string "%Y-%m-%d")))
    (insert "#+DRAFT: false\n")
    (insert "#+TAGS: \n\n")
    (insert "* Introduction\n\n")))

;; Bind to a key
(global-set-key (kbd "C-c h n") 'hugo-new-post)
```

## Resources

- [Hugo Org Mode Support](https://gohugo.io/content-management/formats/#org-mode)
- [ox-hugo Documentation](https://ox-hugo.scripter.co/)
- [Org Mode Manual](https://orgmode.org/manual/)
