import jwt from 'jsonwebtoken';

import { findVideoIdByUser, updateStats, insertStats } from '../../db/hasura';

export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(403).send({ msg: 'error' });
      } else {
        const videoId = req.query.videoId;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer;
        console.log(req.query);

        const statsExist = await findVideoIdByUser(userId, videoId, token);
        if (statsExist) {
          // update it
          const response = await updateStats(token, {
            watched: false,
            userId,
            videoId: 'eeZ1Ufdra0E',
            favorited: 0
          });
          res.send({ msg: 'it works', response });
        } else {
          // add it
          const response = await insertStats(token, {
            watched: false,
            userId,
            videoId: 'Me50VkUdP2I',
            favorited: 0
          });
          res.send({ msg: 'it works', response });
        }
      }
    } catch (err) {
      console.error('failed /stats', err);
      res.status(500).send({ done: false, error: err?.message });
    }
  }
}
