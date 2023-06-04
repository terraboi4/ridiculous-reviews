import PocketBase from "pocketbase";

export const pb = new PocketBase("https://ridiculous-reviews.pockethost.io");

export const getPosts = async () => {
  const records = await pb.collection("posts").getFullList({
    sort: "-created",
  });
  return records;
};

export const getSinglePost = async (id) => {
  const records = await pb.collection("posts").getFirstListItem(`id='${id}'`);
  return records;
};

export const getComments = async (postId) => {
  const records = await pb.collection("comments").getFullList({
    filter: `post.id="${postId}"`,
  });
  return records;
};

export const makeComment = async ({ postId, text, author }) => {
  const data = {
    author: author,
    text: text,
    laughs: 0,
    post: postId,
  };
  console.log(`Author: ${author}`);

  const record = await pb.collection("comments").create(data);
};

export const login = async (data) => {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};

export const signUp = async (data) => {
  try {
    const record = await pb.collection("users").create({
      username: data.username,
      password: data.password,
      email: data.email,
      passwordConfirm: data.password,
    });
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password);
  } catch (error) {
    console.error(error);
  }
};
