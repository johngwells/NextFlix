import { magicAdmin } from '../../lib/magic-server';
import jwt from 'jsonwebtoken';

import { isNewUser, createNewUser } from '../../db/hasura.js';
import { setTokenCookie } from '../../lib/cookies';

export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : '';

      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      // create jwt
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`
          }
        },
        process.env.JWT_SECRET
      );

      // check if user exists
      const isNewUserQuery = await isNewUser(token, metadata.issuer);

      isNewUserQuery && (await createNewUser(token, metadata)) 
        // set cookie
        setTokenCookie(token, res);
        res.send({ done: true });
    } catch (err) {
      console.error('Something went wrong loggin in', err);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
