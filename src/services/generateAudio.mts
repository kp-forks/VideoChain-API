import puppeteer from "puppeteer"
import { downloadVideo } from "./downloadVideo.mts"

const instances: string[] = [
  process.env.VS_AUDIO_GENERATION_SPACE_API_URL
]

// TODO we should use an inference endpoint instead
export async function generateAudio(prompt: string, audioFileName: string) {
  const instance = instances.shift()
  instances.push(instance)

  console.log("instance:", instance)
  
  const browser = await puppeteer.launch({
    headless: false,
    protocolTimeout: 800000,
  })

  const page = await browser.newPage()

  await page.goto(instance, {
    waitUntil: "networkidle2",
  })

  await new Promise(r => setTimeout(r, 3000))

  const firstTextboxInput = await page.$('input[data-testid="textbox"]')

  await firstTextboxInput.type(prompt)

  // console.log("looking for the button to submit")
  const submitButton = await page.$("button.lg")

  // console.log("clicking on the button")
  await submitButton.click()

  await page.waitForSelector("a[download]", {
    timeout: 800000, // need to be large enough in case someone else attemps to use our space
  })

  const audioRemoteUrl = await page.$$eval("a[download]", el => el.map(x => x.getAttribute("href"))[0])


  console.log({
    audioRemoteUrl,
  })


  // console.log("downloading file from space..")
  console.log(`- downloading ${audioFileName} from ${audioRemoteUrl}`)

  await downloadVideo(audioRemoteUrl, audioFileName)

  return audioFileName
}
