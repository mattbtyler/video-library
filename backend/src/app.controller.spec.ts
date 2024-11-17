import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Video } from './entities/video.entity'
import { Repository } from 'typeorm'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Video),
          useClass: Repository
        }
      ]
    }).compile()

    appController = module.get<AppController>(AppController)
    appService = module.get<AppService>(AppService)
  })

  describe('getVideos', () => {
    it('should return an array of videos', async () => {
      const result = []
      jest.spyOn(appService, 'findAll').mockResolvedValue(result)

      expect(await appController.getVideos()).toBe(result)
    })
  })

  describe('getVideo', () => {
    it('should return a mock video', async () => {
      const result: Video = {
        id: 5,
        name: 'Test',
        url: 'https://www.youtube.com/watch?v=1234',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      }

      jest.spyOn(appService, 'findOne').mockResolvedValue(result)

      expect(await appController.getVideo(1)).toBe(result)
    })
  })
})
