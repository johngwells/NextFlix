import jwt from 'jsonwebtoken';

import { findVideoIdByUser, updateStats, insertStats } from '../../db/hasura';

export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(403).send({ msg: 'error' });
      } else {
        const { videoId, favorited, watched = true } = req.body;
        if (videoId) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          const userId = decodedToken.issuer;
          console.log(req.query);

          const statsExist = await findVideoIdByUser(userId, videoId, token);
          if (statsExist) {
            // update it
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favorited
            });
            res.send({ data: response });
          } else {
            // add it
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favorited
            });
            res.send({ data: response });
          }
        } else {
          res.status(400).send({ error: 'can not update or insert, videoId is missing' });
        }
      }
    } catch (err) {
      console.error('failed /stats', err);
      res.status(500).send({ done: false, error: err?.message });
    }
  }
}
