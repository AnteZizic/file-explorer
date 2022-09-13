import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { client } from "../config/s3Client";
import { BucketParam } from "../contexts/DataContext";

const listAllObjects = async () => {
    try {
        return await client.send(new ListObjectsCommand(BucketParam));
      } catch (err) {
        alert(err);
      }
};

export { listAllObjects }
