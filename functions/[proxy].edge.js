const mobileHost = "edge-device-adaptation-mobile.contentstackapps.com";
const webHost = "edge-device-adaptation.contentstackapps.com";

export default async function handler(request) {
  const clonedHeaders = new Headers(request.headers);
  console.log("clonedHeaders", clonedHeaders)
  const userAgentHeader = clonedHeaders.get('User-Agent');
  console.log("userAgentHeaders", userAgentHeader);
  const modifiedUrl = new URL(request.url);
  if (isMobile(userAgentHeader)) {
    modifiedUrl.hostname = mobileHost;
  } else {
    modifiedUrl.hostname = webHost;
  }

  const newRequest = new Request(
    modifiedUrl, 
    {
      ...request,
      headers: clonedHeaders,
    }
  );
  return fetch(newRequest);
}

function isMobile(userAgent) {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent);
}
