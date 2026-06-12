import { cpSync, existsSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const root = join(fileURLToPath(import.meta.url), "../..")
const patchDir = join(root, "patches/quartz-plugins")
const pluginDir = join(root, ".quartz/plugins")

const patches = [
  "explorer/dist/components/index.js",
  "graph/dist/components/index.js",
  "table-of-contents/dist/components/index.js",
  "table-of-contents/dist/index.js",
]

for (const file of patches) {
  const src = join(patchDir, file)
  const dest = join(pluginDir, file)
  if (!existsSync(src)) {
    console.warn(`Patch not found: ${file}`)
    continue
  }
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest)
  console.log(`Patched: .quartz/plugins/${file}`)
}
