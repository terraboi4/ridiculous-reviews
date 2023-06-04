import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSinglePost,
  getComments,
  makeComment,
  pb,
} from "../utils/pocketbase";
import {
  Text,
  Loading,
  Card,
  Col,
  Input,
  Button,
  Grid,
  Image,
} from "@nextui-org/react";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    getSinglePost(postId).then((post) => {
      setPost(post);
    });
    getComments(postId).then((comments) => {
      setComments(comments);
    });
  }, []);

  return (
    <div className="mx-3 my-3">
      {post == "" ? (
        <div className="text-center">
          <Loading size="lg" />
        </div>
      ) : (
        <div>
          <Card className="w-full h-[500px] my-3" variant="flat">
            <Card.Header className="absolute z-10 top-2">
              <Col>
                <Text
                  color="black"
                  size={30}
                  weight="bold"
                  className="text-center"
                >
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
          </Card>
          <div className="">
            <Text size={50} weight="bold">
              Comments
            </Text>
            <div className="flex flex-col w-3/4 mx-auto">
              <Input
                placeholder="Remember to make it funny!"
                bordered
                className="mb-2"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <Button
                bordered
                className="w-full"
                onClick={() => {
                  makeComment({
                    postId,
                    text: inputValue,
                    author: pb.authStore.model.id,
                  });
                }}
              >
                Add
              </Button>
            </div>

            {comments == null || comments == "" ? (
              <Text>No comments yet 😢</Text>
            ) : (
              comments.map((comment) => {
                return (
                  <Card className="p-2 my-2 w-full lg:w-3/4 xl:w-3/4">
                    <Card.Header>
                      <Image
                        alt="nextui logo"
                        src={
                          comment.author.avatar
                            ? comment.author.avatar
                            : "https://api.dicebear.com/6.x/notionists-neutral/svg?seed=" +
                              comment.author
                        }
                        width="34px"
                        height="34px"
                      />
                      <Grid.Container className="pl-3">
                        <Grid xs={12}>
                          <Text h4>{}</Text>
                        </Grid>
                      </Grid.Container>
                    </Card.Header>
                    <Card.Body className="py-1">
                      <Text>{comment.text}</Text>
                    </Card.Body>
                    <Card.Footer>
                      <Text>{comment.laughs} laughs</Text>
                    </Card.Footer>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
