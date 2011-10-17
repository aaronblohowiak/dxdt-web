local keys = redis.call("smembers", KEYS[1])
local ret = {}
for i,key in pairs(keys) do
  -- for each set member, get the related hash
  local value = redis.call("hgetall", key)
  if value
  then
    ret[i] = {}
    ret[i][1] = "key"
    ret[i][2] = key
    -- for each key:value pair in the hash, append to returning array for this member
    for i2, value2 in pairs(value) do
      ret[i][i2+2] = value2
    end
  end
end
return ret
