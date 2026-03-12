const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const inputPath = path.join(__dirname, 'src', 'assets', 'images', 'logo.png')
const backupPath = path.join(
  __dirname,
  'src',
  'assets',
  'images',
  'logo-original.png'
)

async function compressLogo() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('✗ logo.png 不存在:', inputPath)
      process.exit(1)
    }

    // 备份原始文件
    fs.copyFileSync(inputPath, backupPath)
    console.log('✓ 原始 logo 已备份为 logo-original.png')

    const originalStats = fs.statSync(inputPath)
    console.log(`原始文件大小: ${(originalStats.size / 1024).toFixed(2)} KB`)

    // 压缩并调整大小为 192x192，覆盖原文件
    await sharp(inputPath)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer()
      .then(buf => {
        fs.writeFileSync(inputPath, buf)
      })

    const compressedStats = fs.statSync(inputPath)
    console.log(`压缩后大小: ${(compressedStats.size / 1024).toFixed(2)} KB`)
    console.log(
      `压缩率: ${(
        (1 - compressedStats.size / originalStats.size) *
        100
      ).toFixed(2)}%`
    )
    console.log('✓ logo.png 已压缩为 192x192 并覆盖原文件')
  } catch (err) {
    console.error('✗ 压缩失败:', err.message)
    process.exit(1)
  }
}

compressLogo()
