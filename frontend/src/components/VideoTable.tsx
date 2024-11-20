import {
  Button,
  Card,
  Modal,
  Popconfirm,
  Space,
  Table,
  Form,
  Input
} from 'antd';
import { extractYoutubeVideoId } from '../app/utils';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Video, VideoFormData, VideoSchema } from '../types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useDeleteVideoMutation,
  useUpdateVideoMutation
} from '../features/videos/videosApiSlice';

interface VideoTableProps {
  data: {
    id: number;
    name: string;
    url: string;
  }[];
  onRowClick: (record: { id: number; name: string; url: string }) => void;
}

const VideoTable: React.FC<VideoTableProps> = ({ data, onRowClick }) => {
  const [editRecordId, setEditRecordId] = useState<number | null>(null);
  const [updateVideo] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VideoFormData>({
    resolver: zodResolver(VideoSchema)
  });

  const onEditSubmit = async (formData: VideoFormData) => {
    try {
      const updatedVideo: Video = {
        id: editRecordId!,
        ...formData
      };
      handleEdit(updatedVideo);
      setEditRecordId(null);
    } catch (error) {
      console.error('Failed to update video:', error);
    }
  };

  const handleEdit = async (record: Video) => {
    try {
      await updateVideo(record);
    } catch (error) {
      console.error('Failed to update video:', error);
    }
  };

  const handleDelete = async (record: Video) => {
    try {
      await deleteVideo({ id: record.id });
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: { id: number; name: string; url: string }) => {
        const youtubeCode = extractYoutubeVideoId(record.url);
        const thumbnail = `https://img.youtube.com/vi/${youtubeCode}/0.jpg`;
        return (
          <Card>
            <img
              src={thumbnail}
              style={{ borderRadius: '8px' }}
              width={250}
              alt={record.name}
            />
            <Card.Meta className="pb-6" title={record.name} />
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditRecordId(record.id);
                  reset(record);
                }}
              />
              <div onClick={(e) => e.stopPropagation()}>
                <Modal
                  title="Edit Video"
                  open={editRecordId === record.id}
                  onCancel={() => setEditRecordId(null)}
                  footer={null}
                >
                  <Form onFinish={handleSubmit(onEditSubmit)}>
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
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <Popconfirm
                  title="Are you sure you want to delete this video?"
                  onConfirm={async () => {
                    await handleDelete(record);
                  }}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </Popconfirm>
              </div>
            </Space>
          </Card>
        );
      }
    }
  ];

  const dataSource = data.map((item) => ({
    ...item,
    key: item.id
  }));

  return (
    <div
      className="table-container"
      style={{ height: '80vh', overflowY: 'auto' }}
    >
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        onRow={(record) => ({
          onClick: () => onRowClick(record)
        })}
      />
    </div>
  );
};

export default VideoTable;
