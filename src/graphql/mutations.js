/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
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
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
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
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
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
export const createEducation = /* GraphQL */ `
  mutation CreateEducation(
    $input: CreateEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    createEducation(input: $input, condition: $condition) {
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
export const updateEducation = /* GraphQL */ `
  mutation UpdateEducation(
    $input: UpdateEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    updateEducation(input: $input, condition: $condition) {
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
export const deleteEducation = /* GraphQL */ `
  mutation DeleteEducation(
    $input: DeleteEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    deleteEducation(input: $input, condition: $condition) {
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
export const createConfigurations = /* GraphQL */ `
  mutation CreateConfigurations(
    $input: CreateConfigurationsInput!
    $condition: ModelConfigurationsConditionInput
  ) {
    createConfigurations(input: $input, condition: $condition) {
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
export const updateConfigurations = /* GraphQL */ `
  mutation UpdateConfigurations(
    $input: UpdateConfigurationsInput!
    $condition: ModelConfigurationsConditionInput
  ) {
    updateConfigurations(input: $input, condition: $condition) {
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
export const deleteConfigurations = /* GraphQL */ `
  mutation DeleteConfigurations(
    $input: DeleteConfigurationsInput!
    $condition: ModelConfigurationsConditionInput
  ) {
    deleteConfigurations(input: $input, condition: $condition) {
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
