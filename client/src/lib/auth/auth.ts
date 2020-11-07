import { initAuth0 } from '@auth0/nextjs-auth0';
import { ISession } from '@auth0/nextjs-auth0/dist/session/session';
import { GetServerSidePropsContext } from 'next';

export const auth = initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile',
  redirectUri: `${process.env.NEXT_PUBLIC_CLIENT_BASE}/api/callback`,
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_CLIENT_BASE,
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    storeAccessToken: true,
    storeRefreshToken: true,
    storeIdToken: true,
  },
  audience: process.env.AUTH0_API_AUDIENCE,
});

export const getAccessToken = async (): Promise<string | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_BASE}/api/token`);
  if (!res.ok) {
    return null;
  }
  const { accessToken } = await res.json();
  return accessToken;
};

export const createLoginUrl = (redirectTo?: string): string => {
  let url = `${process.env.NEXT_PUBLIC_CLIENT_BASE}/api/login`;
  if (redirectTo) {
    url = url.concat(`?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return url;
};

export const getSessionOrLogin = async (
  ctx: GetServerSidePropsContext,
): Promise<ISession | null> => {
  const session = await auth.getSession(ctx.req);
  if (!session || !session.user) {
    ctx.res.writeHead(302, {
      Location: createLoginUrl(ctx.req.url),
    });
    ctx.res.end();
    return null;
  }

  return session;
};
