import path from "node:path"

import { completedTasksDirFilePath, pendingTasksDirFilePath } from "../config.mts"
import { readTask } from "./readTask.mts"

export const getTask = async (ownerId: string, videoId: string) => {
  const taskFileName = `${ownerId}_${videoId}.json`

  const completedTaskFilePath = path.join(completedTasksDirFilePath, taskFileName)
  const pendingTaskFilePath = path.join(pendingTasksDirFilePath, taskFileName)

  try {
    const completedTask = await readTask(completedTaskFilePath)
    return completedTask
  } catch (err) {
    try {
      const pendingTask = await readTask(pendingTaskFilePath)
      return pendingTask
    } catch (err) {
      throw new Error(`couldn't find video task ${videoId} for owner ${ownerId}`)
    }
  }
}