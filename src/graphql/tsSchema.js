export const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }
  
  type User {
    id: Int!
    firstName: String
    lastName: String
    avatar: String
    description: String
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
  
  type Workshop {
    id: Int!
    name: String
    description: String,
    logo: String,
    created_at: String,
    updated_at: String,
    start_date: String,
    program_id: Boolean,
    partner_id: Boolean,
    max_capacity: Int,
    ending_date: String,
    ser_id: Int,
    most_supportive_updated_at: Boolean,
    is_test: Boolean,
    private_key: String
  }
  
   type Program {
    id: Int!
    name: String
    description: String,
    logo: String,
    percent: Int
  }

  # the schema allows the following query:
  type Query {
    users: [User]
    posts: [Post]
    workshops: [Workshop]
    programs: [Program]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;