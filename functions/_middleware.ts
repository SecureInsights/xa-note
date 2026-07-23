// Cloudflare Pages Functions 中间件
export async function onRequest(context: any) {
  const { request, env, next } = context
  
  // 设置全局环境变量，供 D1 适配器使用
  if (env.DB) {
    globalThis.DB = env.DB
    globalThis.CF_PAGES = true
    // JWT_SECRET is now generated randomly on each startup in app.ts
  }
  
  return next()
}
