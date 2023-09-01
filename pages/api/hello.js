// import type { NextApiRequest, NextApiResponse } from 'next'

 
export default function handler(
  req,
  res
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}