import { Row, Col, Card, Typography } from "antd";
import { useGetCryptoExchangesQuery } from "../services/cryptoExchangesApi";

const { Text, Paragraph } = Typography;

const Exchanges = () => {
  const { data: exchangesList, isFetching, error } = useGetCryptoExchangesQuery();

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading exchanges 😕</p>;

  const filteredExchanges = exchangesList
    ?.filter((exchange) => exchange.description && exchange.description.trim() !== "")
    .slice(0, 20); 

  return (
    <Row gutter={[16, 16]}>
      {filteredExchanges?.map((exchange) => (
        <Col xs={24} sm={12} md={8} lg={6} key={exchange.id}>
          <Card
            title={<Text strong>{exchange.name}</Text>}
            hoverable
            style={{ minHeight: 200 }}
          >
            <Paragraph>
              <Text strong>Description: </Text>
              {exchange.description}
            </Paragraph>
            <Paragraph>
              <Text strong>Website: </Text>
              {exchange.links?.website?.[0] ? (
                <a href={exchange.links.website[0]} 
                target="_blank" 
                rel="noreferrer"
                style={{ color: "black", textDecoration: "none" }}>
                  {exchange.links.website[0]}
                </a>
              ) : (
                "No website"
              )}
            </Paragraph>
            <Paragraph>
              <Text strong>Last Updated: </Text>
              {new Date(exchange.last_updated).toLocaleString()}
            </Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Exchanges;


