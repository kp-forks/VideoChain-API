import { server, videoId } from "./config.mts"

console.log('submitting a new video..')
const response = await fetch(`${server}/`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    token: process.env.VS_SECRET_ACCESS_TOKEN,
    sequence: {
      id: videoId,
    },
    shots: []
  })
});


console.log('response:', response)
const task = await response.json()

console.log("task:", JSON.stringify(task, null, 2))