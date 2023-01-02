/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      start
      end
      link
      createdAt
      updatedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        start
        end
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      richContent
      category
      tags
      images
      createdAt
      hidden
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        richContent
        category
        tags
        images
        createdAt
        hidden
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      description
      category
      tags
      images
      isForSale
      isSold
      price
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        category
        tags
        images
        isForSale
        isSold
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      summary
      tasks
      link
      status
      tags
      images
      start
      end
      complexity
      tagUsage
      createdAt
      updatedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        summary
        tasks
        link
        status
        tags
        images
        start
        end
        complexity
        tagUsage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
      id
      company
      role
      location
      summary
      details
      companyUrl
      type
      tags
      start
      end
      complexity
      tagUsage
      createdAt
      updatedAt
    }
  }
`;
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        company
        role
        location
        summary
        details
        companyUrl
        type
        tags
        start
        end
        complexity
        tagUsage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEducation = /* GraphQL */ `
  query GetEducation($id: ID!) {
    getEducation(id: $id) {
      id
      organization
      degree
      location
      summary
      details
      organizationUrl
      tags
      start
      end
      complexity
      tagUsage
      createdAt
      updatedAt
    }
  }
`;
export const listEducations = /* GraphQL */ `
  query ListEducations(
    $filter: ModelEducationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEducations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        organization
        degree
        location
        summary
        details
        organizationUrl
        tags
        start
        end
        complexity
        tagUsage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConfiguration = /* GraphQL */ `
  query GetConfiguration($id: ID!) {
    getConfiguration(id: $id) {
      id
      fullName
      nickName
      emailAddress
      tagline
      bio
      logo
      avatar
      favicon
      instagramUrl
      youtubeUrl
      supportUrl
      pages
      pagesCustom {
        name
        link
      }
      resumeGeneratorEnabled
      galleryImages
      prompts {
        title
        images {
          imageUrl
          link
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listConfigurations = /* GraphQL */ `
  query ListConfigurations(
    $filter: ModelConfigurationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fullName
        nickName
        emailAddress
        tagline
        bio
        logo
        avatar
        favicon
        instagramUrl
        youtubeUrl
        supportUrl
        pages
        pagesCustom {
          name
          link
        }
        resumeGeneratorEnabled
        galleryImages
        prompts {
          title
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
      id
      warrior
      otherWarriors
      description
      joint
      plannedStart
      replies
      createdAt
      updatedAt
    }
  }
`;
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        warrior
        otherWarriors
        description
        joint
        plannedStart
        replies
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
