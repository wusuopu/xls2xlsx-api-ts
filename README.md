# xls2xlsx-api
使用 typescript 开发的将 xls 文件转换为 xlsx 格式。
程序提供 http api 和命令行脚本两种形式。

开发环境：
  * node v18.12
  * yarn 1.22.19

### 命令行的方式
```
xlx2xlsx <input.xls> [<output>]
```

### api调用的方式
  * POST /v1/convert
```
请求body：
  file: File;
    xls 文件

返回：
  xlsx 文件内容
```

