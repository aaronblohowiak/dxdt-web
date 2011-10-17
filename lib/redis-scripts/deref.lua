local key = redis.call("hget", KEYS[1], ARGV[1]);
if key then
  return redis.call("hgetall", key);
else
  return;
end