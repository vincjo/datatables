import * as fs from 'fs';

export const load = async () => {
  const path = './src/routes/tutorial';
  return {
    dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
    components: [
      {
        name: 'Main.svelte',
        code: fs.readFileSync(`${path}/html-table/Main.svelte`).toString('utf-8')
      }
    ]
  };
};
