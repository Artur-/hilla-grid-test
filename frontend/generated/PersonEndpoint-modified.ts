import { EndpointRequestInit as EndpointRequestInit_1 } from "@hilla/frontend";
import type Person_1 from "./com/example/application/endpoint/Person.js";
import client_1 from "./connect-client.default.js";
import type Pageable_1 from "./dev/hilla/mappedtypes/Pageable.js";
import PersonModel from "./com/example/application/endpoint/PersonModel-mod.js";
async function list_1(pageable: Pageable_1, init?: EndpointRequestInit_1): Promise<Array<Person_1>> { return client_1.call("PersonEndpoint", "list", { pageable }, init); }
export { list_1 as list };
list_1.returnType = PersonModel;
