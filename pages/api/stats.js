import jwt from 'jsonwebtoken';

import { findVideoIdByUser } from '../../db/hasura';

export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(403).send({ msg: 'error' });
      } else {
        const videoId = req.query.videoId;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer

        const findVideoId = await findVideoIdByUser(userId, videoId, token);
        res.send({ msg: 'it works', decodedToken, findVideoId });
      }
    } catch (err) {
      console.error('failed /stats', err);
      res.status(500).send({ done: false, error: err?.message });
    }
  }
}
