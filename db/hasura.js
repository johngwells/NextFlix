export async function insertStats(
  token,
  { favorited, userId, watched, videoId }
) {
  const operationsDoc = `
    mutation insertStats($favorited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      insert_stats_one(object: {favorited: $favorited, userId: $userId, watched: $watched, videoId: $videoId}) {
        favorited
        userId
      }
    }
  `;
  const response = await fetchGraphQL(
    operationsDoc,
    'insertStats',
    {
      favorited,
      userId,
      watched,
      videoId
    },
    token
  );

  return response;
}

export async function updateStats(
  token,
  { favorited, userId, watched, videoId }
) {
  const operationsDoc = `
    mutation updateStats($watched: Boolean!, $userId: String!, $videoId: String!, $favorited: Int!) {
      update_stats(
        _set: {watched: $watched, favorited: $favorited},
        where: { 
          userId: {_eq: $userId}, 
          videoId: {_eq: $videoId} 
        }) {
        returning {
          favorited
          userId
          watched
          videoId
        }
      }
    }
  `;

  const response = await fetchGraphQL(
    operationsDoc,
    'updateStats',
    {
      favorited,
      userId,
      watched,
      videoId
    },
    token
  );

  return response;
}

export async function findVideoIdByUser(userId, videoId, token) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favorited
      userId
      videoId
      watched
    }
  }
`;

  const response = await fetchGraphQL(
    operationsDoc,
    'findVideoIdByUserId',
    {
      videoId,
      userId
    },
    token
  );

  return response?.data?.stats;
}

// if user does not exist, create.
export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;
  const { issuer, email, publicAddress } = metadata;

  const response = await fetchGraphQL(
    operationsDoc,
    'createNewUser',
    {
      issuer,
      email,
      publicAddress
    },
    token
  );

  return response;
}

// check if a user exist or not
export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer }}) {
        id
        email
        issuer
      }
    }
`;

  const response = await fetchGraphQL(
    operationsDoc,
    'isNewUser',
    {
      issuer
    },
    token
  );

  return response?.data?.users?.length === 0;
}

async function fetchGraphQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_DB, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName
    })
  });

  return await result.json();
}
