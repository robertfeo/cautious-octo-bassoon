import fs from "fs";
import path from "path";
import payload from "payload";

const seed = async () => {
  // Create users
  const users = await createUsers();

  // Create categories
  const categories = await createCategories();

  // Create media
  const media = await createMedia();

  // Create posts
  const posts = await createPosts(users, categories, media);

  console.log("Seed data created successfully");
  process.exit(0);
};

const createUsers = async () => {
  const usersData = [
    {
      email: "user1@example.com",
      password: "password",
      name: "User One",
    },
    {
      email: "user2@example.com",
      password: "password",
      name: "User Two",
    },
  ];

  const users = [];

  for (const userData of usersData) {
    const user = await payload.create({
      collection: "users",
      data: userData,
      overrideAccess: true,
    });
    users.push(user);
  }

  return users;
};

const createCategories = async () => {
  const categoriesData = [
    {
      name: "Technology",
      slug: "technology",
    },
    {
      name: "Lifestyle",
      slug: "lifestyle",
    },
  ];

  const categories = [];

  for (const categoryData of categoriesData) {
    const category = await payload.create({
      collection: "categories",
      data: categoryData,
      overrideAccess: true,
    });
    categories.push(category);
  }

  return categories;
};

const createMedia = async () => {
  const mediaPath = path.resolve(__dirname, "media", "sample-image.jpg");

  // Ensure the media file exists
  if (!fs.existsSync(mediaPath)) {
    console.error("Media file not found:", mediaPath);
    return null;
  }

  const fileData = fs.readFileSync(mediaPath);

  const media = await payload.create({
    collection: "media",
    data: {},
    file: {
      data: fileData,
      mimetype: "image/jpeg",
      filename: "sample-image.jpg",
    },
    overrideAccess: true,
  });

  return media;
};

const createPosts = async (users, categories, media) => {
  // Prepare content state for Lexical Editor
  const contentState = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "This is the content of the post.",
              type: "text",
              version: 1,
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  const postsData = [
    {
      slug: "first-post",
      title: "First Post",
      author: users[0].id,
      likes: 10,
      content: contentState,
      categories: [categories[0].id],
      thumbnail: media ? media.id : null,
    },
    {
      slug: "second-post",
      title: "Second Post",
      author: users[1].id,
      likes: 5,
      content: contentState,
      categories: [categories[1].id],
      thumbnail: media ? media.id : null,
    },
  ];

  const posts = [];

  for (const postData of postsData) {
    const post = await payload.create({
      collection: "posts",
      data: postData,
      overrideAccess: true,
    });
    posts.push(post);
  }

  // Set relatedPosts field after creation
  await payload.update({
    collection: "posts",
    id: posts[0].id,
    data: {
      relatedPosts: [posts[1].id],
    },
    overrideAccess: true,
  });

  await payload.update({
    collection: "posts",
    id: posts[1].id,
    data: {
      relatedPosts: [posts[0].id],
    },
    overrideAccess: true,
  });

  return posts;
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
