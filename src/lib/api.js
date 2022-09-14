const FIREBASE_DOMAIN =
  "https://financial-operations-default-rtdb.firebaseio.com/";

export async function getOperations() {
  const response = await fetch(`${FIREBASE_DOMAIN}/operations.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch operations.");
  }

  const transformedOperations = [];

  for (const key in data) {
    const operationObj = {
      id: key,
      ...data[key],
    };

    transformedOperations.push(operationObj);
  }

  return transformedOperations.reverse();
}

export async function getSingleOperation(operationId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/operations/${operationId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch operation.");
  }

  const loadedOperation = {
    id: operationId,
    ...data,
  };

  return loadedOperation;
}

export async function addOperation(operationData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/operations.json`, {
    method: "POST",
    body: JSON.stringify(operationData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create operation.");
  }

  return response.ok;
}
