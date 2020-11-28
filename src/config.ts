type Config = {
  [key: string]: string;
};

function config(): Config {
  const namespace: string = process.env.GWA_NAMESPACE || '';
  const env = process.env.GWA_ENV || '';
  const clientId: string = process.env.CLIENT_ID || '';
  const clientSecret: string = process.env.CLIENT_SECRET || '';
  const legacyAuthorizationEndpoint: string =
    'https://auth-qwzrwc-test.pathfinder.gov.bc.ca/auth/realms/aps/protocol/openid-connect/token';
  const legacyApiHost: string =
    'https://gwa-api-qwzrwc-test.pathfinder.gov.bc.ca/v1';
  const authorizationEndpoint: string = `https://authz-264e6f-${env}.apps.silver.devops.gov.bc.ca/auth/realms/aps/protocol/openid-connect/token`;
  const apiHost: string = `https://gwa-api-264e6f-${env}.apps.silver.devops.gov.bc.ca/v1`;

  return {
    authorizationEndpoint,
    apiHost,
    clientId,
    clientSecret,
    env,
    namespace,
    legacyAuthorizationEndpoint,
    legacyApiHost,
  };
}

export default config;