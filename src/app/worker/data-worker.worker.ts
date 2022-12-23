/// <reference lib="webworker" />

import { objectToClass } from '../transformer';

addEventListener('message', ({ data }) => {
  //convert simple object data to class data and then emit it
  const response = objectToClass(data);
  postMessage(response);
});
