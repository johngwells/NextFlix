This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

API routes can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in pages/api/hello.js.

The pages/api directory is mapped to /api/*. Files in this directory are treated as API routes instead of React pages.

# local.env file
- set development to false if you want to see the youtube api. true will access youtube dummy data. Youtube data quota runs out quickly so test sparingly with the real data. 
```
YOUTUBE_API_KEY=<REPLACE THIS>
NEXT_PUBLIC_MAGIC_API_KEY=<REPLACE THIS>
MAGIC_SERVER_KEY=<REPLACE THIS>
NEXT_PUBLIC_HASURA_DB={HasuraUrl}
NEXT_PUBLIC_HASURA_SECRET=<REPLACE THIS>
JWT_SECRET=<REPLACE THIS>
DEVELOPMENT=true
```

You can retrieve the above environment values by referring their docs linked above and once retrieved, paste above accordingly.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
