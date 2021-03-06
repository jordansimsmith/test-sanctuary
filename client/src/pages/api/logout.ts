import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../lib/auth/auth';

const logout = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    await auth.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default logout;
