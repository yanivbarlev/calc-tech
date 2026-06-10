# Vercel Deployer Skill

## Purpose
Deploy this calc-tech project to Vercel and verify the live site is up.

## When to invoke
- User says "deploy", "push to prod", "go live", "ship it"
- After a code change is ready and committed
- When asked to check deployment status or verify the live URL
- When managing env vars

## Project context
- **Vercel project:** `yanivs-projects-faa86cc8/calc-tech`
- **Vercel account:** `yaniv-4320`
- **GitHub repo:** `https://github.com/yanivbarlev/calc-tech.git`
- **Live domain:** `https://calc-tech.com`
- **Also served on:** `ppltok.com`, `speedtst.online`
- **Mechanism:** Vercel auto-deploys on every push to `main` (~3 minutes build time)

## Deploy steps

### 1. Stage & commit (if uncommitted changes exist)
```powershell
git status
git diff --stat
git add <specific files>   # never git add -A blindly — avoid .env, node_modules
git commit -m "..."        # message must explain WHY, not just what changed
git push origin main
```

### 2. Watch deployment status
```powershell
# Poll until the new deployment shows Ready (check every 20s, up to 4 minutes)
$before = (vercel ls --yes 2>&1 | Select-String "vercel.app" | Select-Object -First 1).ToString().Trim()
Write-Host "Waiting for new deployment after: $before"

$start = Get-Date
do {
    Start-Sleep -Seconds 20
    $latest = (vercel ls --yes 2>&1 | Select-String "vercel.app" | Select-Object -First 1).ToString()
    $ready  = $latest -match "Ready"
    $elapsed = [int]((Get-Date) - $start).TotalSeconds
    Write-Host "${elapsed}s — $($latest.Trim())"
} while (-not $ready -and $elapsed -lt 240)
```

### 3. Verify the live URL
```powershell
(Invoke-WebRequest -Uri "https://calc-tech.com" -UseBasicParsing).StatusCode
```
Expected: `200`. Never report success until confirmed.

### 4. Read build logs if something fails
```powershell
vercel logs <deployment-url> 2>&1 | Select-Object -Last 40
```

## Useful CLI commands
```powershell
vercel ls --yes                    # list recent deployments + status
vercel logs <url>                  # build/runtime logs for a deployment
vercel env ls                      # list env vars
vercel env add <NAME> production   # add env var (prompts for value)
vercel env rm <NAME> production    # remove env var
vercel domains ls                  # list domains on this account
vercel inspect <url>               # deployment metadata
```

## Current env vars in Vercel (production)
| Name | Status |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Set |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Set |
| `CLERK_SECRET_KEY` | Set |
| `SUPABASE_URL` | **MISSING** — random-chat won't work without it |
| `SUPABASE_SERVICE_ROLE_KEY` | **MISSING** |
| `NEXT_PUBLIC_SUPABASE_URL` | **MISSING** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **MISSING** |

To add a missing var:
```powershell
vercel env add SUPABASE_URL production
# paste value when prompted
```

## Known build gotchas

### Duplicate JSX attribute → silent Vercel build failure
Writing the same attribute twice on a JSX/TSX element is a hard TypeScript error that **does not surface in `tsc --noEmit`** (the `.next/` type cache hides it), but **kills the Vercel production build**:

> "JSX elements cannot have multiple attributes with the same name."

Symptom: `vercel ls` shows `● Error`; the previous deployment keeps serving with no obvious CLI message.

Common trigger — inline SVG `<path>` with `fill` copy-pasted twice:
```tsx
// ❌ broken — two fill attributes
<path fill="#05bc05" d="M1 7l4 4 8-8" stroke="#05bc05" strokeWidth="2" fill="none"/>

// ✅ fixed — only one fill
<path d="M1 7l4 4 8-8" stroke="#05bc05" strokeWidth="2" fill="none"/>
```

**Rule:** always run `npm run build` locally before pushing when adding inline SVGs or copy-pasting JSX attributes.

## Rules
- Never report the task done until the live URL returns 200.
- Always commit specific files, not `git add .`.
- Commit messages: explain WHY, not what changed.
- If the build fails, read logs before concluding anything.
