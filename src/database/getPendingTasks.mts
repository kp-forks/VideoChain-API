import { VideoTask } from "../types.mts"
import { pendingTasksDirFilePath } from "./constants.mts"
import { readTasks } from "./readTasks.mts"

export const getPendingTasks = async (): Promise<VideoTask[]> => {
  const pendingTasks = await readTasks(pendingTasksDirFilePath)

  return pendingTasks
}