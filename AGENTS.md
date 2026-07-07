<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->


- always use pnpm to install packages
- Do not start the development server without first verifying whether port 3000 is already in use. If a server is already running on port 3000, use the existing server instead of starting a new one.
- **Do not execute unilateral architectural changes without approval** - consult owner first
- **IF YOU FIND ANYTHING THAT IS HARD TO DO OR THAT NEEDS TO BE NOTED FOR FUTURE AI AGENTS** - ADD THAT TO THE AGENTS.md FILE AS A NEW RULE.


<!-- BEGIN:past-agent-finding-and-notes -->

- pnpm commands can fail with ERR_PNPM_IGNORED_BUILDS in this repo; if that happens, check `/home/runner/work/the-mergex-company/the-mergex-company/pnpm-workspace.yaml` allowBuilds values before retrying lint/build.
- **Navbar Theme Routing:** If a new page has a white/light hero section and the navbar text needs to be dark (black), add its pathname to the `LIGHT_HERO_ROUTES` array in `src/components/layout/Header/Navbar.tsx`.

<!-- END:past-agent-finding-and-notes -->
