import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Post {
  readonly id: string;
  readonly title?: string;
  readonly content?: string;
  readonly tags?: (string | null)[];
  readonly images?: (string | null)[];
  readonly createdAt?: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Project {
  readonly id: string;
  readonly name?: string;
  readonly summary?: string;
  readonly tasks?: (string | null)[];
  readonly link?: string;
  readonly status?: string;
  readonly tags?: (string | null)[];
  readonly images?: (string | null)[];
  readonly start?: string;
  readonly end?: string;
  readonly complexity?: number;
  readonly tagUsage?: (number | null)[];
  constructor(init: ModelInit<Project>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

export declare class Job {
  readonly id: string;
  readonly company?: string;
  readonly role?: string;
  readonly location?: string;
  readonly summary?: string;
  readonly details?: (string | null)[];
  readonly companyUrl?: string;
  readonly type?: string;
  readonly tags?: (string | null)[];
  readonly start?: string;
  readonly end?: string;
  readonly complexity?: number;
  readonly tagUsage?: (number | null)[];
  constructor(init: ModelInit<Job>);
  static copyOf(source: Job, mutator: (draft: MutableModel<Job>) => MutableModel<Job> | void): Job;
}

export declare class Education {
  readonly id: string;
  readonly organization?: string;
  readonly degree?: string;
  readonly location?: string;
  readonly summary?: string;
  readonly details?: (string | null)[];
  readonly organizationUrl?: string;
  readonly tags?: (string | null)[];
  readonly start?: string;
  readonly end?: string;
  readonly complexity?: number;
  readonly tagUsage?: (number | null)[];
  constructor(init: ModelInit<Education>);
  static copyOf(source: Education, mutator: (draft: MutableModel<Education>) => MutableModel<Education> | void): Education;
}

export declare class Configuration {
  readonly id: string;
  readonly name?: string;
  readonly tagline?: string;
  readonly avatar?: string;
  readonly favicon?: string;
  readonly pages?: (string | null)[];
  constructor(init: ModelInit<Configuration>);
  static copyOf(source: Configuration, mutator: (draft: MutableModel<Configuration>) => MutableModel<Configuration> | void): Configuration;
}