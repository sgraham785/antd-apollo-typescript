import gql from "graphql-tag";

export const UsersQuery = gql`
  query getUsers {
    users {
      id
      firstName
      lastName
      avatar
      description
    }
  }
`;

export const WorkshopsQuery = gql`
  query getWorkshops {
    workshops {
      id
      name
      description
      logo
    }
  }
`;

export const ProgramsQuery = gql`
  query getPrograms {
    programs {
      id
      name
      description
      logo
      percent
    }
  }
`;

export const PostsQuery = gql`
  query getPosts {
    posts {
      id
      title
    }
  }
`;

export const PostsForAuthorQuery = gql`
  query PostsForAuthor {
    author(id: 1) {
      firstName
        posts {
          title
          votes
       }
    }
}`;
