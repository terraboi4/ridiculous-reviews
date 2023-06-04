import { useEffect, useState } from "react";
import { getPosts, getComments } from "../utils/pocketbase";
import { Loading, Card, Col, Row, Button, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="my-3 mx-3 flex justify-center">
      <div className="w-full lg:w-3/4 xl:w-3/4 ">
        {posts === null ? (
          <Loading size="lg" />
        ) : (
          posts.map((post) => {
            return (
              <Card
                className="h-[400px] my-4"
                isPressable
                isHoverable
                onClick={() => {
                  navigate(`/posts/${post.id}`);
                }}
              >
                <Card.Header className="absolute z-10 top-2">
                  <Col>
                    <Text color="black" size={20} weight="bold">
                      {post.name}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Body className="p-0">
                  <Card.Image
                    src={
                      post.image
                        ? `https://ridiculous-reviews.pockethost.io/api/files/ntyi9xvgcic2260/${post.id}/${post.image}`
                        : "https://placehold.co/600x400?text=No+Image+Provided"
                    }
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt="Card example background"
                  />
                </Card.Body>
                <Card.Footer isBlurred className=" absolute z-10 bottom-0">
                  <Row>
                    <Col>
                      <Row justify="flex-end">
                        <Text size={15}>0 comments</Text>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
