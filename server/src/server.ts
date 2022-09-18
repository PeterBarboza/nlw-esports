import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import {
  convertHourStringToMinutes,
  validateHoursFormat,
} from "./utils/convert-hour-string-to-minutes"
import { plainToInstance } from "class-transformer"
import { CreateAdDTO } from "./dto/CreateAdDTO"
import { validate } from "class-validator"
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string"

const app = express()
const prisma = new PrismaClient({
  log: ["query", "error"],
})

app.use(express.json())
app.use(cors())

app.get("/games", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    })
    res.json(games)
  } catch (error) {
    res.sendStatus(400)
  }
})
app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        ads: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            hourStart: true,
            hourEnd: true,
            weekDays: true,
            yearsPlaying: true,
            useVoiceChannel: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    if (!game) return res.sendStatus(404)

    const ads = game.ads.map((ad) => {
      return {
        ...ad,
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
        weekDays: ad.weekDays.split(","),
      }
    })

    res.json(ads)
  } catch (error) {
    res.sendStatus(400)
  }
})
app.post("/games/:id/ads", async (req, res) => {
  const body = req.body
  const gameId = req.params.id

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    })

    if (!game) return res.sendStatus(404)

    const validatedBody = plainToInstance(CreateAdDTO, body)

    const errors = await validate(validatedBody)
    if (errors.length > 0) throw errors

    if (
      !validateHoursFormat(validatedBody.hourStart) ||
      !validateHoursFormat(validatedBody.hourEnd)
    ) {
      throw new Error(
        "Invalid string format. expected format according to the regex: /([0-2][0-9]:[0-5][0-9])/g"
      )
    }

    const ad = await prisma.ad.create({
      data: {
        name: validatedBody.name,
        hourStart: convertHourStringToMinutes(validatedBody.hourStart),
        hourEnd: convertHourStringToMinutes(validatedBody.hourEnd),
        weekDays: validatedBody.weekDays,
        yearsPlaying: validatedBody.yearsPlaying,
        useVoiceChannel: validatedBody.useVoiceChannel,
        discord: validatedBody.discord,
        gameId: gameId,
      },
    })

    res.json(ad)
  } catch (error) {
    console.log(error)

    res.sendStatus(400)
  }
})
app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id

  try {
    const ad = await prisma.ad.findUnique({
      where: {
        id: adId,
      },
      select: {
        discord: true,
      },
    })

    if (!ad) return res.sendStatus(404)

    res.json(ad)
  } catch (error) {
    res.sendStatus(400)
  }
})
app.listen(3333, () => console.log("Server is runnig on port: [3333]"))
