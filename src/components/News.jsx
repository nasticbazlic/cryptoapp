// import { Select, Row, Col, Typography, Avatar, Card } from 'antd';
// import moment from 'moment/moment';

// import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

// const { Title, Text } = Typography;
// const { Option } = Select;

// const News = ( {simplified} ) => {
//   const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 10 : 100});
//   console.log(cryptoNews);
  
//   return (
//     <div>
//       News
//     </div>
//   )
// }

// export default News

// import React, { useState } from 'react';
// import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
// import moment from 'moment';

// import { useGetCryptosQuery } from '../services/cryptoApi';
// import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
// // import Loader from './Loader';

// const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

// const { Text, Title } = Typography;
// const { Option } = Select;

// const News = ({ simplified }) => {
//   const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
//   const { data } = useGetCryptosQuery(100);
//   const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

//   if (!cryptoNews?.value) return 'Loader...';

//   return (
//     <Row gutter={[24, 24]}>
//       {!simplified && (
//         <Col span={24}>
//           <Select
//             showSearch
//             className="select-news"
//             placeholder="Select a Crypto"
//             optionFilterProp="children"
//             onChange={(value) => setNewsCategory(value)}
//             filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//           >
//             <Option value="Cryptocurrency">Cryptocurrency</Option>
//             {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
//           </Select>
//         </Col>
//       )}
//       {cryptoNews.value.map((news, i) => (
//         <Col xs={24} sm={12} lg={8} key={i}>
//           <Card hoverable className="news-card">
//             <a href={news.url} target="_blank" rel="noreferrer">
//               <div className="news-image-container">
//                 <Title className="news-title" level={4}>{news.name}</Title>
//                 <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
//               </div>
//               <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
//               <div className="provider-container">
//                 <div>
//                   <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
//                   <Text className="provider-name">{news.provider[0]?.name}</Text>
//                 </div>
//                 <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
//               </div>
//             </a>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default News;
import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ count: 12 });
  

  if (isFetching) return 'Loader...';
  if (!cryptoNews?.data) return 'No news found';

  const newsToShow = simplified ? cryptoNews.data.slice(0, 6) : cryptoNews.data.slice(0, 12);

  return (
     <Row gutter={[24, 24]}>
      {newsToShow.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4}>{news.title || 'No title'}</Title>
                <img 
                  src={news?.thumbnail || demoImage} 
                  alt={news.title || 'news'} 
                  style={{ height: '150px', objectFit: 'cover', width: '50%' }}
                />
              </div>
              <p>{news.description ? (news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description) : 'No description available'}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>{news.createdAt ? moment(news.createdAt).startOf('ss').fromNow() : 'Unknown'}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;






