<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->


- always use pnpm to install packages
- Do not start the development server without first verifying whether port 3000 is already in use. If a server is already running on port 3000, use the existing server instead of starting a new one.