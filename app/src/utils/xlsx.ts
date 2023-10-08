import XLSX from 'xlsx'
import fs from "fs";
import Path from "path";

const parseOutput = (input, output) => {
  let outDir
  const i = Path.parse(input)
  if (output) {
    const o = Path.parse(output)
    if (o.ext === '.xlsx') {
      return output
    }
    // 指定的是一个目录
    outDir = output
  } else {
    outDir = i.dir
  }
  let filename = Path.join(outDir, `${i.name}.xlsx`)
  if (fs.existsSync(filename)) {
    filename = Path.join(outDir, `${i.name}-${new Date().toJSON().replace(/[-:]/g, '')}.xlsx`)
  }
  return filename
}

type IType = 'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';
export default {
  convert (input, type: IType = 'file', outputType: IType = 'file', output = '') {
    let file
    if (type === 'file') {
      file = XLSX.readFile(input, { type , cellStyles: true })
    } else {
      file = XLSX.read(input, { type , cellStyles: true })
    }

    if (outputType === 'file') {
      // 保存到文件
      output = parseOutput(input, output)
      XLSX.writeFile(file, output, { type: 'file', cellStyles: true, bookType: 'xlsx', compression: true })
      console.log(`convert '${input}' --> '${output}'`)
    }
    // 返回文件内容
    return XLSX.write(file, { type: 'buffer', bookType: 'xlsx', compression: true })
  }
}
