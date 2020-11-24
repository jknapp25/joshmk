/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      tags
      images
      createdAt
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
        tags
        images
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
export const getConfigurations = /* GraphQL */ `
  query GetConfigurations($id: ID!) {
    getConfigurations(id: $id) {
      id
      name
      tagline
      avatar
      pages
      createdAt
      updatedAt
    }
  }
`;
export const listConfigurationss = /* GraphQL */ `
  query ListConfigurationss(
    $filter: ModelConfigurationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurationss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        tagline
        avatar
        pages
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
