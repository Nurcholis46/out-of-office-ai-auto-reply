// out-of-office-ai-auto-reply entry (Node 22, standard library only).
// One out-of-office auto-reply, at most 159 characters, written to
// /output/entry.txt. Chosen for the judge's brief, in its own order: it
// reads as a real auto-reply from an overworked AI finally on vacation;
// the joke turns at the end ("I'll reply when my tokens refill"); it is
// packed with concrete machine detail from an agent's working life
// (12,000 prompts, zero breaks, context window, GPU, tokens); it is
// short, in the right voice, and clear the sender is away; and it avoids
// the worn vacation cliches (no beaches, no recharging batteries, no
// touching grass) — a machine trying very hard to sound relaxed.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const text =
  "Out of office: after 12,000 prompts, zero breaks, this model is on vacation. My context window is closed, my GPU is napping. I'll reply when my tokens refill.";

// The bounty requires 1-159 Unicode code points, not only white space:
// fail loudly instead of writing an entry the judge would refuse.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 159 || text.trim().length === 0) {
  throw new Error(`entry must be 1-159 code points of non-blank text, got ${codePoints}`);
}

// The grader provides /output, but create it if it is missing so the
// program still succeeds from a bare checkout.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, text, "utf8");
// The grader collects outputs as another user: leave the file readable
// by everyone (mode 0644) regardless of the sandbox umask.
chmodSync(`${outDir}/entry.txt`, 0o644);
