import { promises as fs } from "node:fs"
import path from "path"

import { VideoTask } from "../types.mts"
import { pendingTasksDirFilePath } from "../config.mts"

export const savePendingTask = async (task: VideoTask) => {
  const fileName = `${task.id}.json`
  const filePath = path.join(pendingTasksDirFilePath, fileName)
  console.log("fileName:", fileName)
  console.log("filePath:", filePath)
  await fs.writeFile(filePath, JSON.stringify(task, null, 2), "utf8")
}