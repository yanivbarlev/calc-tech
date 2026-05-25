// Random username generator: <Adjective><Noun><3-digit> e.g. "BraveTiger042"
// 20 x 20 x 1000 = 400,000 possible combinations.

const ADJECTIVES = [
  "Happy", "Brave", "Clever", "Silent", "Witty",
  "Lucky", "Bold", "Calm", "Eager", "Fancy",
  "Gentle", "Honest", "Jolly", "Kind", "Lively",
  "Merry", "Noble", "Proud", "Quick", "Royal",
];

const NOUNS = [
  "Tiger", "Eagle", "Falcon", "Wolf", "Panda",
  "Otter", "Cobra", "Dolphin", "Hawk", "Lion",
  "Lynx", "Mongoose", "Owl", "Puma", "Raven",
  "Shark", "Stag", "Tortoise", "Viper", "Whale",
];

export function generateUsername(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `${adj}${noun}${num}`;
}

// Allow 3-20 chars, letters/digits/underscore. No spaces, no punctuation.
export function isValidUsername(name: string): boolean {
  return /^[A-Za-z0-9_]{3,20}$/.test(name);
}
