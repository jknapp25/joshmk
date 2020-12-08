// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Project, Job, Education, Configuration } = initSchema(schema);

export {
  Post,
  Project,
  Job,
  Education,
  Configuration
};