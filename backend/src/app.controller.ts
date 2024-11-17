import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common'
import { AppService } from './app.service'
import { Video } from './entities/video.entity'

@Controller('videos')
export class AppController {
  constructor(private readonly videoService: AppService) {}

  @Get()
  getVideos(): Promise<Video[]> {
    return this.videoService.findAll()
  }

  @Get(':id')
  getVideo(@Param('id') id: number): Promise<Video> {
    return this.videoService.findOne(id)
  }

  @Post()
  createVideo(@Body() videoData: Video): Promise<Video> {
    return this.videoService.create(videoData)
  }

  @Patch(':id')
  updateVideo(@Param('id') id: number, @Body() videoData: Video): Promise<Video> {
    return this.videoService.update(id, videoData)
  }

  @Delete(':id')
  deleteVideo(@Param('id') id: number): Promise<Video> {
    return this.videoService.delete(id)
  }
}
