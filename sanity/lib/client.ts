import { apiVersion, dataset, projectId, useCdn } from "../env";
import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:"sk1vLVLbe3AyWd80q6WJbxbDTdZkKqRIUjDLWKpX6q5a7cKaiNFARtnRHRJORCdnu61SQaodsn9rPPn2lsTQRMWIrDg4O4AShVYnIDg5QAVJhoTg7xwmmZzFvZQlUce5F0fhrDyz825RHOAqpSrtgKeKYPWlDxD6ixpOF73fkkOrxYHnhtC8"
});
