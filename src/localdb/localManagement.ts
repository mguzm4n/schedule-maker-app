type State = 'OK' | 'FAILED';
interface PostMsg {
  state: State,
  msg: string,
}

type GetMsg<T> = PostMsg & {
  data: T[]
}

export const postToCollection = <T>(collectionName: string, object: T): PostMsg => {
  // Gets collection named collectionName as array of T objects.
  const fetchFirstTry = localStorage.getItem(collectionName);
  let response;
  if (!fetchFirstTry) {
    response = postItem([], collectionName);
  }

  // After first try you have already array of objects, or it's always been there
  // so get collection normally.
  let finalResponse: PostMsg | undefined;
  if (response?.state === 'OK' || fetchFirstTry) {
    const collectionStr = localStorage.getItem(collectionName)!;
    const collection: T[] = JSON.parse(collectionStr);
    collection.push(object);
    finalResponse = postItem(collection, collectionName);
  }

  if (finalResponse === undefined) {
    return {
      state: 'FAILED',
      msg: "Couldn't set collection first"
    }
  }

  return finalResponse;
};

export const getCollection = <T>(collectionName: string): GetMsg<T> => {
  const objectStr = localStorage.getItem(collectionName);
  if (!objectStr) {
    return {
      state: 'FAILED',
      msg: `Couldnt get collection ${collectionName}`,
      data: []
    }
  }
  return {
    state: 'OK',
    msg: 'Fetched correctly',
    data: JSON.parse(objectStr)
  };
};

export const postItem = <T>(object: T, collectionName: string): PostMsg => {
  const stringObject = JSON.stringify(object);
  try {
    localStorage.setItem(collectionName, stringObject); 
    return {
      state: 'OK',
      msg: 'Correctly set object',
    }
  } catch (error) {
    console.error(error);
    return {
      state: 'FAILED',
      msg: `Couldn't set object: ${stringObject}`
    };
  }
};