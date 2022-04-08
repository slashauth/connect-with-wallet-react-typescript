const SERVER_DOMAIN = 'http://localhost:5000'

export type TokenResponse = {
  accessToken: string;
  expirationEpoch: number;
}

export const getNonceToSign = async (walletAddress: string): Promise<string> => {
  const url = `${SERVER_DOMAIN}/getNonceToSign?address=${walletAddress}`;

  const serverResponse = await fetch(url);
  const body = await serverResponse.json();

  return body.nonce
}

export const verifySignedMessage = async (walletAddress: string, signature: string): Promise<TokenResponse | null> => {
  const url = `${SERVER_DOMAIN}/verifySignedMessage`;

  const serverResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      walletAddress,
      signature,
    }),
  });

  const body = await serverResponse.json();
  return {
    accessToken: body.accessToken,
    expirationEpoch: body.expirationEpoch,
  };
}