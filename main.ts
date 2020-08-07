import { PrismaClient } from "@prisma/client";
import * as faker from "faker";

const names: string[] = [];
const ids: string[] = [];

function uniqueID() {
  let id;
  do {
    id = faker.random.alphaNumeric(64);
  } while (ids.includes(id));

  ids.push(id);

  return id;
}

function uniqueName() {
  let name;

  do {
    name =
      faker.name.firstName() +
      " " +
      faker.name.firstName() +
      " " +
      faker.name.lastName();
  } while (names.includes(name));

  names.push(name);

  return name;
}

async function main() {
  const client = new PrismaClient({});
  // Remove old data
  await client.executeRaw("delete from prisma_post");
  await client.executeRaw("delete from prisma_user");

  // Create new users with posts
  const requests = Array.from({ length: 3000 });
  let news = requests.map((_, i) => {
    const id = uniqueID();
    const name = uniqueName();
    console.log("count " + i + " id: " + id + ", name: " + name);
    return client.user2.create({
      data: {
        id: id,
        name: name,
        posts: {
          create: Array.from({
            length: 100,
          }).map(() => ({
            id: uniqueID(),
            title: name + " " + faker.lorem.slug(),
          })),
        },
      },
    });
  });

  await client.transaction(news);
  client.disconnect();
}

main();
