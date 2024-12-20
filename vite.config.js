import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 『base: '.'』相対パスでリソースを解決する
// 出力するディレクトリ名を『page-self-publishing-order』とする。
export default defineConfig({
  base: '.',
  build: {
    outDir: 'page-self-publishing-order'
  },
  plugins: [react()],
});