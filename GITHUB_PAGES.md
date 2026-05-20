# Hướng dẫn deploy lên GitHub Pages dùng GitHub Actions

Để tự động hóa việc deploy khi bạn push code lên GitHub, hãy tạo file `.github/workflows/deploy.yml` với nội dung sau:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build with Next.js
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Lưu ý quan trọng khi dùng Sub-path:
Nếu project của bạn nằm ở `username.github.io/repo-name/`, bạn cần sửa `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/repo-name',
  assetPrefix: '/repo-name',
  // ...
};
```
