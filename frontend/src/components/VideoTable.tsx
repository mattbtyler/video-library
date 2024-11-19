import { Card, Table } from 'antd';
import { extractYoutubeVideoId } from '../app/utils';

interface VideoTableProps {
  data: {
    id: number;
    name: string;
    url: string;
  }[];
  onRowClick: (record: { id: number; name: string; url: string }) => void;
}

const VideoTable: React.FC<VideoTableProps> = ({ data, onRowClick }) => {
  const columns = [
    {
      // title: 'Name',
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
            <Card.Meta
              title={record.name}
              // description={record.url}
            />
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
        className="bg-black border-s-orange-600"
      />
    </div>
  );
};

export default VideoTable;
