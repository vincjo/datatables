import * as fs from 'fs';

export const load = async () => {
  const path = './src/routes/tutorial';
  return {
    dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
    components: [
      {
        name: 'Main.svelte',
        code: fs.readFileSync(`${path}/filter-data/Main.svelte`).toString('utf-8')
      },
      {
        name: 'ThFilter.svelte',
        code: fs.readFileSync(`${path}/ThFilter.svelte`).toString('utf-8')
      },
      {
        name: 'Th.svelte',
        code: fs.readFileSync(`${path}/Th.svelte`).toString('utf-8')
      }
    ]
  };
};
