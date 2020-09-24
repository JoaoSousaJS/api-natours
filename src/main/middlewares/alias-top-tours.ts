import { Request, Response, NextFunction } from 'express'

export const aliasTopTours = (req: Request, res: Response, next: NextFunction): void => {
  console.log('teste')
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}
