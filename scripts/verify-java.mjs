#!/usr/bin/env node
// Her ders dosyasındaki Java kod bloklarını derleyip çalıştırır.
// Kullanım: node scripts/verify-java.mjs
// Not: Bu script şu an kod bloklarını metin olarak doğrular (sözdizimi/derlenebilirlik);
// tam sınıf olmayan kod parçaları (snippet) için derlenebilir bir sarmalayıcı (wrapper) üretir.

import { execSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

function hasJavac() {
  try {
    execSync("javac -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function loadLessons() {
  const lessonsDir = path.resolve("src/content/lessons");
  const files = readdirSync(lessonsDir).filter((f) => f.endsWith(".ts"));
  const blocks = [];
  for (const file of files) {
    // ts-node olmadan çalıştırmak için basit bir regex tabanlı çıkarım yapıyoruz:
    // tam bir derleme hattı kurmak yerine, "code:" alanlarını topluyoruz.
    const { readFileSync } = await import("node:fs");
    const text = readFileSync(path.join(lessonsDir, file), "utf8");
    const codeMatches = [...text.matchAll(/code:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) =>
      m[1].replace(/\\"/g, '"').replace(/\\n/g, "\n")
    );
    if (codeMatches.length) blocks.push({ file, lines: codeMatches });
  }
  return blocks;
}

async function main() {
  if (!hasJavac()) {
    console.log(
      "javac bulunamadı. Java kod doğrulaması atlanıyor.\n" +
        "Kurulum için: https://www.oracle.com/java/technologies/downloads/ (JDK 17+) veya `brew install openjdk`.\n"
    );
    process.exit(0);
  }

  const blocks = await loadLessons();
  const tmp = mkdtempSync(path.join(tmpdir(), "choconode-java-"));
  let failures = 0;

  for (const { file, lines } of blocks) {
    const joined = lines.join("\n");
    // Satırlar tam bir sınıf oluşturuyorsa (class X { ... }) doğrudan derle, değilse
    // bir main metoduna sarmalayıp sadece derlenebilirliğini kontrol et.
    const looksLikeClass = /class\s+\w+/.test(joined);
    const className = `Check_${file.replace(/\W/g, "_")}`;
    const source = looksLikeClass
      ? joined.replace(/class\s+(\w+)/, (m, name) => `class ${className}`)
      : `public class ${className} { public static void main(String[] a) throws Exception {\n${joined}\n} }`;

    const srcPath = path.join(tmp, `${className}.java`);
    writeFileSync(srcPath, source, "utf8");
    try {
      execSync(`javac "${srcPath}"`, { cwd: tmp, stdio: "pipe" });
      console.log(`✓ ${file} derlendi.`);
    } catch (e) {
      failures++;
      console.error(`✗ ${file} derlenemedi:\n${e.stderr?.toString() ?? e.message}`);
    }
  }

  rmSync(tmp, { recursive: true, force: true });
  if (failures > 0) {
    console.error(`\n${failures} dosya derlenemedi.`);
    process.exit(1);
  }
  console.log("\nTüm Java kod blokları derlendi.");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
