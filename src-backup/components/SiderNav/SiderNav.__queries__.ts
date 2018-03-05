import gql from "graphql-tag";

export const GetSiderNav = gql`
  query GetSiderNav() {
    sideNav() {
      name
      icon
      path
      children {
        name
        path
      }
    }
  }
`;
