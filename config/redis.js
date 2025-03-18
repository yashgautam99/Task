import Redis from "ioredis";
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = redis;
import redis from "../config/redis.js";

router.get("/", verifyToken, async (req, res) => {
  const cacheKey = `tasks:${JSON.stringify(req.query)}`;
  const cachedTasks = await redis.get(cacheKey);

  if (cachedTasks) return res.json(JSON.parse(cachedTasks));

  const tasks = await Task.find(query)
    .sort({ priority: -1, createdAt: 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  await redis.setex(cacheKey, 60, JSON.stringify(tasks)); // Cache for 60 sec
  res.json(tasks);
});
