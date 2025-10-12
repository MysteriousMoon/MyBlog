// 测试 Unicode 规范化问题
const path1 = "../../content/posts/20231226 域名简单科普/cover.webp";
const path2 = "../../content/posts/20231226 域名简单科普/cover.webp";

console.log("路径看起来一样吗？", path1 === path2);
console.log("路径1长度:", path1.length);
console.log("路径2长度:", path2.length);

// 测试 NFC 和 NFD 规范化
const nfc = path1.normalize('NFC');
const nfd = path1.normalize('NFD');

console.log("\nNFC 长度:", nfc.length);
console.log("NFD 长度:", nfd.length);
console.log("NFC === NFD:", nfc === nfd);

// 模拟 glob 可能返回的键
const files = {
    [nfc]: () => "NFC version",
    [nfd]: () => "NFD version"
};

console.log("\n模拟查找:");
console.log("使用 NFC 查找:", files[nfc] !== undefined);
console.log("使用 NFD 查找:", files[nfd] !== undefined);
console.log("使用原始 path1 查找:", files[path1] !== undefined);
