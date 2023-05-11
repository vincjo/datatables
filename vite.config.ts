import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import * as path from 'path';

const config: UserConfig = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: path.resolve('./src/components'),
      $core: path.resolve('./src/core'),
      $utils: path.resolve('./src/utils'),
      $img: path.resolve('./src/assets'),
      $data: path.resolve('./src/data')
    }
  }
};

export default config;
