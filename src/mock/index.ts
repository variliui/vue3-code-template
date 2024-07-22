//引入mock.js
// import { createProdMockServer } from 'vite-plugin-mock/client'
// const urlPrefix = '/api/mock/'

const modules = import.meta.glob('./**/*.mock.ts', {
  import: 'default',
  eager: true
})

const mockModules: any[] = []
Object.keys(modules).forEach(async (key) => {
  if (key.includes('_')) {
    return
  }
  mockModules.push(...(modules[key] as any))
})