import { verifyToken } from '../lib/utils';

const useRedirectUser = async context => {
  const token = context.req ? context.req?.cookies.token : null;
  const userId = await verifyToken(token);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  return {
    userId,
    token
  };
};

export default useRedirectUser;
