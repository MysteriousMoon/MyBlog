import path from "node:path";

// Simulate the scenarios
const testCases = [
  {
    basePath: "/posts/20231226 域名简单科普/",
    src: "./cover.webp",
    description: "Chinese characters in basePath"
  },
  {
    basePath: "/posts/20240415 《金榜题名之后：大学生出路分化之谜》读后感/",
    src: "./cover.webp",
    description: "Chinese characters with special punctuation in basePath"
  },
  {
    basePath: "/posts/20251012/",
    src: "./cover.webp",
    description: "Normal ASCII path"
  }
];

console.log("Testing path normalization:\n");

testCases.forEach(test => {
  console.log(`\nTest: ${test.description}`);
  console.log(`  basePath: ${test.basePath}`);
  console.log(`  src: ${test.src}`);
  
  const normalizedPath = path
    .normalize(path.join("../../", test.basePath, test.src))
    .replace(/\\/g, "/");
  
  console.log(`  Normalized: ${normalizedPath}`);
  
  // Check encoding
  console.log(`  Buffer length: ${Buffer.from(normalizedPath).length}`);
  console.log(`  String length: ${normalizedPath.length}`);
});
