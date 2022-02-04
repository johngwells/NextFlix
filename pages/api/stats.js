import jwt from 'jsonwebtoken';

import { findVideoIdByUser, updateStats, insertStats } from '../../db/hasura';

export default async function stats(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send({ msg: 'error' });
    } else {
      const { videoId } = req.body;
      if (videoId) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer;

        const findVideo = await findVideoIdByUser(userId, videoId, token);
        const statsExist = findVideo?.length > 0;

        if (req.method === 'POST') {
          const { favorited, watched = true } = req.body;
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
        // Get Request - find video if exist
        } else {
          if (statsExist) {
            res.send({ findVideo });
          } else {
            res.status(404);
            res.send({ user: null, msg: 'Video not found' });
          }
        }
      }
    }
  } catch (err) {
    console.error('failed /stats', err);
    res.status(500).send({ done: false, error: err?.message });
  }
}
