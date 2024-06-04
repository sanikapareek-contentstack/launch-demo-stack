const mobileHost = "launch-edge-functions-demo-mobile.contentstackapps.com";
const webHost = "launch-edge-functions-demo.contentstackapps.com";

export default async function handler(request) {
  const userAgentHeader = request.headers.get('User-Agent');
  const modifiedUrl = new URL(request.url);
  if (isMobile(userAgentHeader)) {
    modifiedUrl.hostname = mobileHost;
  } else {
    modifiedUrl.hostname = webHost;
  }

  const newRequest = new Request(modifiedUrl, request);
  return fetch(newRequest);
}

function isMobile(userAgent) {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent);
}