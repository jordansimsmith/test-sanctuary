import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../lib/auth/auth';

const login = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    await auth.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default login;
