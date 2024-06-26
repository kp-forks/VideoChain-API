import { RenderedScene, RenderRequest, VideoGenerationParams } from "../types.mts"

// import { generateVideo } from "../providers/video-generation/generateVideoWithZeroscope.mts"
// import { generateVideo } from "../providers/video-generation/generateVideoWithHotshotGradioAPI.mts"
// import { generateVideoWithAnimateLCM } from "../providers/video-generation/generateVideoWithAnimateLCM.mts"
import { generateVideoWithAnimateDiffLightning } from "../providers/video-generation/generateVideoWithAnimateDiffLightning.mts"

export async function renderVideo(
  request: RenderRequest,
  response: RenderedScene
): Promise<RenderedScene> {

  await generateVideoWithAnimateDiffLightning(request, response)

  return response
}