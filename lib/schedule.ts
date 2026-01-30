import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import type { ScheduleData, Sponsor } from '@/types/schedule';

// Server-only functions (use fs)
export function getScheduleData(): ScheduleData {
  const filePath = path.join(process.cwd(), 'data', 'schedule.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.parse(fileContents);
  return data as ScheduleData;
}

export function getSponsors(): Sponsor[] {
  const filePath = path.join(process.cwd(), 'data', 'sponsors.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.parse(fileContents);
  return data.sponsors as Sponsor[];
}
