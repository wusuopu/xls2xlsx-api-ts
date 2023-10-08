#!/usr/bin/env node
import xlsx from "@/utils/xlsx";
import fs from "fs";


const printHelp = () => {
  console.log('Usage: xlx2xlsx <input.xls> [<output>]')
}


const main = async () => {
  const input = process.argv[2]
  const output = process.argv[3]
  if (!input) {
    printHelp()
    console.error('缺少 xls 文件参数');
    process.exit(1)
  }
  if (!input.endsWith('.xls')) {
    console.error('不是 xls 文件');
    process.exit(1)
  }
  if (!fs.existsSync(input)) {
    console.error(`文件不存在 ${input}`);
    process.exit(1)
  }

  xlsx.convert(input, 'file', 'file', output)
}

if (require.main === module) {
  main()
}
