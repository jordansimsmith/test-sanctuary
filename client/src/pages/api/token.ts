import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../lib/auth/auth';

const token = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const tokenCache = auth.tokenCache(req, res);
    const token = await tokenCache.getAccessToken();
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default token;
