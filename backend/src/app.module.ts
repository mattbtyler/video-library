import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Video } from './entities/video.entity'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydb.sqlite',
      entities: [Video],
      synchronize: true // Only for development
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'videos',
    //   entities: [],
    //   synchronize: true
    // }),
    TypeOrmModule.forFeature([Video])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
