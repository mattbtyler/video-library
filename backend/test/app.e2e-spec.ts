import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  const testId = 10000
  const testUrl = 'https://youtu.be/lcoo0Siq5c4?si=fwCtDP4En9bdda12'
  const testCreatedAt = '2024-11-14T21:19:43.000Z'
  const testUpdatedAt = '2024-11-14T21:19:43.000Z'

  const data = {
    id: testId,
    name: 'foooooooooo',
    url: testUrl,
    createdAt: testCreatedAt,
    updatedAt: testUpdatedAt
  }

  it('/ (POST TEST VIDEO)', () => {
    return request(app.getHttpServer())
      .post('/videos')
      .send(data)
      .expect(201)
      .expect(data)
  })

  it('/ (GET TEST VIDEO)', () => {
    return request(app.getHttpServer()).get(`/videos/${testId}`).expect(200).expect(data)
  })

  it('/ (PATCH AND VERIFY TEST VIDEO)', async () => {
    await request(app.getHttpServer())
      .patch(`/videos/${testId}`)
      .send({ name: 'barrrrr' })
      .expect(200)

    const getResponse = await request(app.getHttpServer())
      .get(`/videos/${testId}`)
      .expect(200)

    const patchData = data
    data.name = 'barrrrr'
    data.updatedAt = getResponse.body.updatedAt

    expect(getResponse.body).toEqual(expect.objectContaining(patchData))
  })

  it('/ (DELETE TEST VIDEO)', () => {
    return request(app.getHttpServer()).delete(`/videos/${testId}`).send().expect(200)
  })
})
