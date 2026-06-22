export function errorPage(title: string, message: string, status: number) {
  return new Response(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#fff;color:#000;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
  .card{border:1px solid #e5e5e5;border-radius:12px;padding:32px;max-width:420px;width:100%;text-align:center}
  h1{font-size:20px;font-weight:600;margin-bottom:8px}
  p{font-size:14px;color:#737373;line-height:1.6;margin-bottom:24px}
  a{display:inline-block;padding:10px 24px;font-size:14px;font-weight:500;color:#fff;background:#000;border-radius:9999px;text-decoration:none;transition:background .2s}
  a:hover{background:#262626}
  @media(prefers-color-scheme:dark){body{background:#000;color:#fff}.card{border-color:#262626}h1{color:#fff}p{color:#a3a3a3}a{background:#fff;color:#000}a:hover{background:#e5e5e5}}
</style>
</head>
<body><div class="card"><h1>${title}</h1><p>${message}</p><a href="/dashboard">Back to Dashboard</a></div></body>
</html>`,
    {
      status,
      headers: { "Content-Type": "text/html" },
    }
  );
}
