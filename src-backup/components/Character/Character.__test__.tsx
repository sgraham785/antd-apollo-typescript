// import * as React from 'react';
// import * as renderer from 'react-test-renderer';

// // @IMPORTANT this is normally consumed from react-apollo/test-utils
// // but during development, it needs to be pulled from lib
// import { MockedProvider } from 'react-apollo/test-utils';

// // import { addTypenameToDocument } from 'apollo-client/queries/queryTransform';
// import { GetCharacter } from './Character.__queries__'
// import { Episode } from '../../__generated__/types';
// import { Character, CharacterProps } from './Character';

// // const query = addTypenameToDocument(HERO_QUERY);
// const query = GetCharacter;

// import {
//     empty,
//     hero_no_friends,
//     empty_array_friends,
//     friend_without_appearsIn,
//     full,
// } from './Character.__mocks__';

// const variables = { episode: Episode.NEWHOPE };

// describe('withCharacter', () => {
//     it('shapes the props into variables', done => {
//         class Container extends React.Component<CharacterProps> {
//             componentWillMount() {
//                 expect(this.props.episode).toEqual(variables);
//                 done();
//             }
//             render() {
//                 return null;
//             }
//         }

//         const mocks = [
//             { request: { query, variables }, result: { data: { hero: empty } } },
//         ];
//         renderer.create(
//             <MockedProvider mocks={mocks}>
//                 <Container {...variables} />
//             </MockedProvider>,
//         );
//     });
//     it('reshapes the data into the passed props', done => {
//         class Container extends React.Component<ShapedProps> {
//             componentWillReceiveProps(next: ShapedProps) {
//                 expect(next.hero).toEqual(hero_no_friends);
//                 done();
//             }
//             render() {
//                 return null;
//             }
//         }

//         const ContainerWithData = withCharacter(Container);
//         const mocks = [
//             {
//                 request: { query, variables },
//                 result: { data: { hero: hero_no_friends } },
//             },
//         ];
//         renderer.create(
//             <MockedProvider mocks={mocks}>
//                 <ContainerWithData {...variables} />
//             </MockedProvider>,
//         );
//     });
//     it('has a loading state', done => {
//         class Container extends React.Component<ShapedProps> {
//             componentWillMount() {
//                 expect(this.props.loading).toBe(true);
//             }
//             componentWillReceiveProps(next: ShapedProps) {
//                 expect(next.loading).toBe(false);
//                 done();
//             }
//             render() {
//                 return null;
//             }
//         }

//         const ContainerWithData = withCharacter(Container);
//         const mocks = [
//             {
//                 request: { query, variables },
//                 result: { data: { hero: hero_no_friends } },
//             },
//         ];
//         renderer.create(
//             <MockedProvider mocks={mocks}>
//                 <ContainerWithData {...variables} />
//             </MockedProvider>,
//         );
//     });
//     it('has a potential error state', done => {
//         class Container extends React.Component<ShapedProps> {
//             componentWillMount() {
//                 expect(this.props.loading).toBe(true);
//             }
//             componentWillReceiveProps(next: ShapedProps) {
//                 expect(next.loading).toBe(false);
//                 expect(next.error.message).toMatch(
//                     /these are not the droids you are looking for/,
//                 );
//                 done();
//             }
//             render() {
//                 return null;
//             }
//         }

//         const ContainerWithData = withCharacter(Container);
//         const mocks = [
//             {
//                 request: { query, variables },
//                 error: new Error('these are not the droids you are looking for'),
//             },
//         ];

//         renderer.create(
//             <MockedProvider mocks={mocks}>
//                 <ContainerWithData {...variables} />
//             </MockedProvider>,
//         );
//     });
// });

// describe('Character', () => {
//     it('handles a loading state', () => {
//         const output = renderer.create(<Character loading />);
//         expect(output.toJSON()).toMatchSnapshot();
//     });
//     it('handles an error state', () => {
//         const output = renderer.create(<Character error />);
//         expect(output.toJSON()).toMatchSnapshot();
//     });
//     it('returns markup for null response', () => {
//         const output = renderer.create(<Character hero={empty} />);
//         expect(output.toJSON()).toMatchSnapshot();
//     });
//     it('returns markup for a hero with no friends', () => {
//         const output = renderer.create(
//             <Character hero={hero_no_friends} />,
//         );
//         expect(output.toJSON()).toMatchSnapshot();
//     });
//     it('returns markup for empty array of friends', () => {
//         const output = renderer.create(
//             <Character hero={empty_array_friends} />,
//         );
//         expect(output.toJSON()).toMatchSnapshot();
//     });
//     it('returns markup for a friend without an appearsIn', () => {
//         const output = renderer.create(
//             <Character hero={friend_without_appearsIn} />,
//         );
//         expect(output.toJSON()).toMatchSnapshot();
//     });
//     it('renders a full data result', () => {
//         const output = renderer.create(<Character hero={full} />);
//         expect(output.toJSON()).toMatchSnapshot();
//     });
// });

// describe('App', () => {
//     it('renders the data from NEWHOPE', () => {
//         const mocks = [
//             { request: { query, variables }, result: { data: { hero: empty } } },
//         ];
//         const output = renderer.create(
//             <MockedProvider mocks={mocks}>
//                 <App />
//             </MockedProvider>,
//         );

//         expect(output.toJSON()).toMatchSnapshot();
//     });
// });
