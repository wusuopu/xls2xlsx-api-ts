import _ from "lodash";
import formidable from "formidable";
import fs from "fs-extra";
import { Response, NextFunction } from 'express';
import { HTTPRequest } from "@/types/global";
import logger from "@/utils/logger";

const rmFile = async (file) => {
  if (!file.destroy) {
    return
  }
  logger.debug(`unlink file:${file.filepath}`)
  await file.destroy()
}
const cleanTmpFiles = async (files) => {
  if (_.isEmpty(files)) {
    return
  }
  for (const key in files) {
    const f = files[key]
    if (_.isArray(f)) {
      for (const item of f) {
        await rmFile(item)
      }
    } else {
      await rmFile(f)
    }
  }
}

// 解析 multipart/form-data
export default function (req: HTTPRequest, res: Response, next: NextFunction) {
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return next()
  }

  const form = formidable({
    multiples: true,
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    req.body = fields
    req.files = files
    next()
  })
  // 请求结束之后删除临时上传的文件
  res.once('finish', () => {
    cleanTmpFiles(req.files)
  })
}
