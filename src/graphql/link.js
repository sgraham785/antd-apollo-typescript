import { graphql, print } from "graphql";
import { ApolloLink, Observable } from "apollo-link";
//import { schema } from "./schema";
import { typeDefs } from "./tsSchema";
import { makeExecutableSchema } from 'graphql-tools';
import { find, filter } from 'lodash';

const workshops = [
  {
    id:  1,
    name: "Ivan's Workshop",
    description: "This is description for Ivan's workshop",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
    created_at: "2018-02-27T15:19:58.399-08:00",
    updated_at: " 2018-02-27T15:19:58.399-08:00",
    start_date: "2018-02-12",
    program_id: 1,
    partner_id: "nil",
    max_capacity: 20,
    ending_date: "2018-03-29",
    ser_id: "nil",
    most_supportive_updated_at: "nil",
    is_test: false,
    private_key: "MEDTORNIC"
  },
  {
    id:  2,
    name: "Sean's Workshop",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
    description: "This is description for Seans's workshop",
    created_at: "2018-01-27T15:19:58.399-08:00",
    updated_at: " 2018-01-27T15:19:58.399-08:00",
    start_date: "2018-01-12",
    program_id: 1,
    partner_id: "nil",
    max_capacity: 10,
    ending_date: "2018-02-29",
    ser_id: "nil",
    most_supportive_updated_at: "nil",
    is_test: true,
    private_key: "GOOGLE"
  }
];

const programs = [
  {
    id:  1,
    name: "Discovery",
    description: "This is description for Discovery",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
    created_at: "2018-02-27T15:19:58.399-08:00",
    percent: 60
  },
  {
    id:  2,
    name: "VLM",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
    description: "This is description for VLM",
    created_at: "2018-01-27T15:19:58.399-08:00",
    percent: 90
  },
  {
    id:  3,
    name: "Astro",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
    description: "This is description for Astro",
    created_at: "2018-01-27T15:19:58.399-08:00",
    percent: 70
  }
];

const authors = [
  { id: 1, firstName: 'Ivan', lastName: 'Prokic' },
  { id: 2, firstName: 'Sean', lastName: 'Graham'},
];
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
  { id: 5, authorId: 1, title: 'Rule the world', votes: 7 },
];

// data coming from postgres
const users = [
  { id: 1, firstName: 'Ivan', lastName: 'Prokic', avatar: 'https://image.flaticon.com/icons/svg/149/149995.svg', description: 'Reactive' },
  { id: 2, firstName: 'Sean', lastName: 'Graham', avatar: 'https://image.flaticon.com/icons/svg/149/149995.svg', description: 'Graphiql' },
  { id: 3, firstName: 'Adam', lastName: 'Kaufman', avatar: 'https://image.flaticon.com/icons/svg/149/149995.svg', description: 'Executive' },
];

// extract into reseolvers
const resolvers = {
  Query: {
    posts: () => posts,
    users: () => users,
    workshops: () => workshops,
    programs: () => programs,
    author: (_, { id }) => find(authors, { id: id }),
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const link = new ApolloLink(operation => {
  return new Observable(observer => {
    const { query, operationName, variables } = operation;
    delay(300)
      .then(() =>
        graphql(schema, print(query), null, null, variables, operationName)
      )
      .then(result => {
        console.log('Observable ', result)
        observer.next(result);
        observer.complete();
      })
      .catch(observer.error.bind(observer));
  });
});

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
