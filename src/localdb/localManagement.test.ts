import { postItem, postToCollection, getCollection } from "./localManagement";
import {describe, expect, test} from '@jest/globals';

type User = {
  id: number, 
  name: string,
  lastname: string,
}

test("Post an object when there's no collection array created", () => {
  const user1: User = {
    id: 1,
    name: 'Marcelo',
    lastname: 'Guzman',
  }

  const collectionName = 'users';
  const response = postToCollection(collectionName, user1);
  const users = getCollection<User[]>(collectionName);
  expect(users).toBe([]);
})