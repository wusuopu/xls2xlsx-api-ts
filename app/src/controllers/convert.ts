import { Request, Response } from 'express';
import { HTTPRequest } from "@/types/global";
import xlsx from "@/utils/xlsx";
import _ from 'lodash';

export default {
  async create (req: HTTPRequest, res: Response) {
    let input = req.files.file
    if (_.isArray(input)) {
      input = input[0]
    }
    if (_.isEmpty(input)) {
      return res.status(400).json({success: false, errors: ['missing xls file']});
    }

    res.attachment('output.xlsx')
    const data = xlsx.convert(input.filepath, 'file', 'buffer')
    res.end(data)
  },
}
