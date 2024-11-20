import { useState } from 'react';
import { Layout, Menu, Button, Modal, Form, Input, Card } from 'antd';
import {
  HomeOutlined,
  PlusOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import {
  useGetVideosQuery,
  useCreateVideoMutation
} from './features/videos/videosApiSlice';
import VideoTable from './components/VideoTable';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YouTubePlayer } from 'react-youtube';
import VideoControls from './components/VideoControls';
import VideoPlayer from './components/VideoPlayer';
import { Video, VideoFormData, VideoSchema } from './types';
import { extractYoutubeVideoId } from './app/utils';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const { data = [] } = useGetVideosQuery(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createVideo] = useCreateVideoMutation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<VideoFormData>({
    resolver: zodResolver(VideoSchema)
  });

  const [selectedKey, setSelectedKey] = useState<string>('1');
  const [selectedVideo, setSelectedVideo] = useState<VideoFormData | null>(
    null
  );

  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const handlePlayerReady = (playerInstance: YouTubePlayer) => {
    setPlayer(playerInstance);
  };
  const playVideo = () => player?.playVideo();
  const pauseVideo = () => player?.pauseVideo();
  const seekVideo = (seconds: number) => {
    if (player) player.seekTo(player.getCurrentTime() + seconds);
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedKey('2');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedKey(selectedVideo ? '0' : '1');
  };

  const onCreateSubmit = async (formData: VideoFormData) => {
    try {
      await createVideo(formData).unwrap();
      setIsModalVisible(false);
      setSelectedKey('1');
    } catch (error) {
      console.error('Failed to create video:', error);
    }
  };

  const handleRowClick = (record: Video) => {
    setSelectedKey('0');
    setSelectedVideo(record);
  };

  const handleBackToTable = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Layout className="bg-black font-bold font-['SF Pro Display']">
        <Sider className="v-screen border-green-500 border-r-2 bg-black">
          <div className="m-10 font-sans font-bold text-lg">Video-Player</div>
          <Menu
            mode="inline"
            className="bg-black"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Library',
                onClick: () => setSelectedVideo(null)
              },
              {
                key: '2',
                icon: <PlusOutlined />,
                label: 'Create',
                onClick: showModal
              }
            ]}
          />
        </Sider>
        <Content className="bg-black">
          {selectedVideo ? (
            <>
              <Header className="bg-black pl-6">
                <Button
                  type="primary"
                  icon={<ArrowLeftOutlined />}
                  onClick={handleBackToTable}
                  className="mb-4"
                  style={{ borderRadius: '50%' }}
                ></Button>
              </Header>

              <Card title={selectedVideo.name}>
                <VideoPlayer
                  onPlayerReady={handlePlayerReady}
                  videoId={extractYoutubeVideoId(selectedVideo.url) || ''}
                />
              </Card>
            </>
          ) : (
            <div>
              <VideoTable data={data} onRowClick={handleRowClick} />
            </div>
          )}
        </Content>
        <Modal
          title="Create Video"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit(onCreateSubmit)}>
            <Form.Item
              label="Name"
              validateStatus={errors.name ? 'error' : ''}
              help={errors.name?.message}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
            <Form.Item
              label="YouTube url"
              validateStatus={errors.url ? 'error' : ''}
              help={errors.url?.message}
            >
              <Controller
                name="url"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
      <Layout>
        <Footer className="text-center border-t-2 border-green-500 bg-black">
          {selectedVideo ? (
            <VideoControls
              selectedVideo={selectedVideo}
              onPlay={playVideo}
              onPause={pauseVideo}
              onSeek={seekVideo}
            />
          ) : null}
        </Footer>
      </Layout>
    </>
  );
};

export default App;
