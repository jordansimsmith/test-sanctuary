import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../lib/auth/auth';

const me = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth.handleProfile(req, res, { refetch: true });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default me;
