import * as React from 'react';
import { Query } from 'react-apollo';
import {
  GetCharacterQuery,
  GetCharacterQueryVariables,
  Episode,
} from '../../__generated__/types';
import { GetCharacter as QUERY } from './Character.__queries__';

import { Card } from 'antd/lib';

class CharacterQuery extends Query<
  GetCharacterQuery,
  GetCharacterQueryVariables
  > { }

export interface CharacterProps {
  episode: Episode;
}

export const Character: React.SFC<CharacterProps> = props => {
  const { episode } = props;

  return (
    <CharacterQuery query={QUERY} variables={{ episode }}>
      {({ loading, data, error }) => {
        if (loading) return <Card title='Loading' loading>Loading</Card>;
        if (error) return <h1>ERROR</h1>;
        if (!data) return <div>no data</div>;

        const { hero } = data;
        return (
          <div>
            {hero && (
              <Card title={hero.name}>
                {hero.friends &&
                  hero.friends.map(
                    friend =>
                      friend && (
                        <h6 key={friend.id}>
                          {friend.name}:{' '}
                          {friend.appearsIn
                            .map(x => x && x.toLowerCase())
                            .join(', ')}
                        </h6>
                      ),
                  )}
              </Card>
            )}
          </div>
        );
      }}
    </CharacterQuery>
  );
};

export default Character;
