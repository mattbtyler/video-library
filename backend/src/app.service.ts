import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Video } from './entities/video.entity'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find()
  }

  async findOne(id: number): Promise<Video> {
    return this.videoRepository.findOne({ where: { id: id } })
  }

  async create(video: Video): Promise<Video> {
    if (!this.isValidYouTubeUrl(video.url)) {
      throw new BadRequestException('Invalid YouTube URL')
    }
    return this.videoRepository.save(video)
  }

  async update(id: number, video: Partial<Video>): Promise<Video> {
    const foundVideo = await this.videoRepository.findOne({
      where: { id: id }
    })

    if (!foundVideo) {
      throw new BadRequestException('Video not found')
    }

    if (video.url && !this.isValidYouTubeUrl(video.url)) {
      throw new BadRequestException('Invalid YouTube URL')
    }

    return this.videoRepository.save({ ...foundVideo, ...video })
  }

  async delete(id: number): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { id: id } })
    if (!video) {
      throw new BadRequestException('Video not found')
    }
    return this.videoRepository.remove(video)
  }

  private isValidYouTubeUrl(url: string): boolean {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/
    return regex.test(url)
  }
}
