const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function roundFavicon() {
  console.log("Applying 5px rounded corners to all favicons...");

  // 1. Process public/favicon.png (64x64)
  // Non-transparent icon box: x=3, y=3, w=58, h=58
  // 5px radius at 32x32 corresponds to ~9px radius on 58x58
  const rx64 = 8;
  const mask64 = Buffer.from(
    `<svg width="64" height="64">
      <rect x="3" y="3" width="58" height="58" rx="${rx64}" ry="${rx64}" fill="white" />
    </svg>`
  );

  const rounded64 = await sharp("public/favicon.png")
    .composite([{ input: mask64, blend: "dest-in" }])
    .png()
    .toBuffer();

  fs.writeFileSync("public/favicon.png", rounded64);
  console.log("Updated public/favicon.png (64x64) with rounded corners (rx=8)");

  // 2. Process 512x512 favicons:
  // - public/assets/favicon.png
  // - app/icon.png
  // - public/favicon.ico
  // Non-transparent icon box: x=26, y=26, w=460, h=460
  // Proportional radius for 512x512 (58x58 rx=8 -> 460x460 rx=64)
  const rx512 = 64;
  const mask512 = Buffer.from(
    `<svg width="512" height="512">
      <rect x="26" y="26" width="460" height="460" rx="${rx512}" ry="${rx512}" fill="white" />
    </svg>`
  );

  const rounded512 = await sharp("public/assets/favicon.png")
    .composite([{ input: mask512, blend: "dest-in" }])
    .png()
    .toBuffer();

  fs.writeFileSync("public/assets/favicon.png", rounded512);
  fs.writeFileSync("app/icon.png", rounded512);
  fs.writeFileSync("public/favicon.ico", rounded512);
  console.log("Updated public/assets/favicon.png, app/icon.png, public/favicon.ico (512x512) with proportional rounded corners (rx=64)");

  // 3. Create a 32x32 version with exact 5px radius
  const mask32 = Buffer.from(
    `<svg width="32" height="32">
      <rect x="1" y="1" width="30" height="30" rx="5" ry="5" fill="white" />
    </svg>`
  );

  const rounded32 = await sharp(rounded512)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .composite([{ input: mask32, blend: "dest-in" }])
    .png()
    .toBuffer();

  fs.writeFileSync("public/favicon-32x32.png", rounded32);
  console.log("Created public/favicon-32x32.png with exact 5px radius");

  // 4. Create a 16x16 version
  const mask16 = Buffer.from(
    `<svg width="16" height="16">
      <rect x="0" y="0" width="16" height="16" rx="3" ry="3" fill="white" />
    </svg>`
  );

  const rounded16 = await sharp(rounded512)
    .resize(16, 16, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .composite([{ input: mask16, blend: "dest-in" }])
    .png()
    .toBuffer();

  fs.writeFileSync("public/favicon-16x16.png", rounded16);
  console.log("Created public/favicon-16x16.png");

  console.log("All favicons successfully rounded!");
}

roundFavicon().catch(console.error);
