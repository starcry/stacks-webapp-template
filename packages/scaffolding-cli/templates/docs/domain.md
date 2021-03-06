# Domain PROJECT_NAME

## DESCRIPTION:

TODO: more stuff in general about the app here

NB: the app assumes a deployment into a K8s cluster and following a typical
pattern of namespace separation and routing from an ingress controller under a
path such as `/web/app`.

### UI components

### Middlewares

<!-- should be done as packages -->

##### logger

[Application insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
is used to monitor both the node(express) instance and the NextJS client code
running on the browser. AppInsights is configured with the `instrumentationKey`
(or `process.env.APPINSIGHTS_INSTRUMENTATIONKEY`) provided from the environment
variables. AppInsights collects the console logs provided by the Winston.
AppInsights on Client side is implemented using a React HOC(Higher order
component) to the Next's `_app.ts`. All logs collected can be monitored at
[Azure portal](https://portal.azure.com/)

##### helmet

##### error-handler

The generated scaffolding can be quickly used make calls to external APIs
meaning another endpoint either within your system developed by another team or
a public endpoint of 3rd party provider e.g. `hotels.com` etc...

The backend (and frontend) uses the [axios](https://github.com/axios/axios)
library as the HTTPclient.

It is on purpose left as a thin wrapper implementation so that the user can
extend with additional parameters on top of the mandated ones; `url`, `method` -
e.g. a header for authentication. As such it only returns an unopinionated axios
Instance and not a method initialized implementation. the method paratemer is
mainly used as a type guard.

Sample implementation of an entire API can be found in the
[menu api](../src/ssr/constants/apis/menu.ts), this demonstrates a business
specific implementation of talking to a data provider from node and exposing an
internal route within express for the FE to use for proxy.

The base implemenation shouldn't be need to touch and it can be found in the
[here](../src/ssr/constants/apis/index.ts).

To extend and add more of your own custom implementation use menu as an example.

```javascript
/**
 * base interface used by all implementations e.g. `menu`
 */
export interface Api {
  /**
   *
   * this is the external url - can be in the form of https://api.hotels.com/foo or when used inside a Kubernetes cluster
   * talking to another service within the same namespace it can take the form of `http://service_name` or
   * `http://service_name.namespace`
   * NB: do not omit the protocol `http` or `https` otherwise axios will default to localhost:80 as it will not recognise it as a valid TLD.
   *
   */
  baseURL: string;
  /**
   * this is the version that's appended to the baseUrl e.g. a value of `v2` => `https://api.hotels.com/foo/v2` || `http://service_name.namespace/v2`
   */
  version: string;
  /**
   * this is the internal base path for the application
   * can be left empty in localhost but should be set at deploy time if your application is not run under the root of your domain
   * e.g. https://app.example.com/web/ui
   * you would set this value to `/web/ui`
   */
  internalBasePath: string;
  endpoints: Endpoint;
}

/**
 * key map denifinition for endpoints
 */
export interface Endpoint {
  [key: string]: {
    /**
     * internal route used by express i.e. relative to localhost:${PORT}/myroute
     */
    routeDefinition: string,
    /**
     * returns the built external URL for this endpoint
     */

    getExternalURL: (...params) => string,
    /**
     * returns the method for the endpoint called by NodeJS httpclient(axios)
     * NB: should be done on a 1-2-1 parity with internal/external
     * i.e. if an external method is a GET the internal proxy route shoudl also be a GET
     */

    method: HTTPMethod,
    /**
     * returns the built internalUrl called by the clientside code (axios) a.k.a BFF
     * NB: when deployed under a CDN or proxied path within an K8s cluster this will be included
     * e.g. /web/ui/myroute => when called from client it should look like this https://app.example.com/web/ui/myroute
     * NB2: leave out the preceeding slash => getInternalURL: (id: string) => `deletemenu/${id}`,
     * that will be added in via the builder process which invokes a "private" method within the Api base class.
     */

    getInternalURL: (...params) => string,
  };
}
```

NB: baseURL and internalBasePath are rigged to be populated from the config
object see [below](####config)

## Internal APIs

These are used by the front end hit the relevant proxied endpoint within node
(behind an express route).

An example of how this is implemented can be seen in the
[server.ts](../src/ssr/server/index.ts) - again this file can be zero-touch and
user should focus only on extending the individual APIs - see
[menu api](../src/ssr/server/api/menu/index.ts).

Sample implementation from a page can be seen in
[here](../src/ssr/components/ApiPane/index.tsx).

Key things to note:

- `import api from "constants/apis/menu";`
  - multiple APIs from constants can be instatiated
  - e.g. `import menuApi from "constants/apis/menu";`
    `import categoryApi from "constants/apis/menu";`

```javascript
const menu = menuApi('getMenuList') // must correspond to a key in the Endpoints for that class's Api implementation

const res = await axios({
  method: menu.method,
  url: menu.internalEndpoint(),
})
```

## External APIs

##### config

The application can use a mixture of environment variables and statically
defined values. Typically you would define an environment variable for things
that are likely to change on stage by stage basis - where stage is Dev, Test,
Prod commonly separated by a namespace in the cluster.

TBD: implement a config map ?

At application start a config object is created and used at runtime by various
classes that need to access it, the app code should not reference the
`process.env.*` at any point instead creating a binding of these values in the
`environment-variables.ts` which are added into the final config object.

`baseURL` and `internalBasePath` within the `Api` subclassing should always
point to a config value e.g. see snippet below

```javascript
/**
 * potential replacement
 * import getConfig from 'next/config'
 * const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
 */
import conf from '../../config' //
baseURL = conf.MENU_API_URL
internalBasePath = conf.APP_BASE_PATH
```
