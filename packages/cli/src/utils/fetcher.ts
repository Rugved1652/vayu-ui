import { join } from 'node:path';

const GITHUB_BASE = 'https://raw.githubusercontent.com/Rugved1652/vayu-ui/main/packages/ui/src';

export interface FetchResult {
  path: string;
  content: string;
}

export function buildComponentUrl(directoryName: string, fileName: string): string {
  return `${GITHUB_BASE}/components/${directoryName}/${fileName}`;
}

export function buildHookUrl(fileName: string): string {
  return `${GITHUB_BASE}/hooks/${fileName}`;
}

export function buildUtilsUrl(): string {
  return `${GITHUB_BASE}/utils/index.ts`;
}

export async function fetchFile(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

export async function fetchComponentFiles(
  directoryName: string,
  fileNames: string[],
): Promise<FetchResult[]> {
  const results = await Promise.all(
    fileNames.map(async (name) => {
      const url = buildComponentUrl(directoryName, name);
      const content = await fetchFile(url);
      return { path: join(directoryName, name), content };
    }),
  );
  return results;
}

export async function fetchHookFile(fileName: string): Promise<FetchResult> {
  const url = buildHookUrl(fileName);
  const content = await fetchFile(url);
  return { path: fileName, content };
}

export async function fetchUtils(): Promise<FetchResult> {
  const content = await fetchFile(buildUtilsUrl());
  return { path: 'utils/index.ts', content };
}
