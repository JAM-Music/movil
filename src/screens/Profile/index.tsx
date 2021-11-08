import React from 'react';
import {Button} from 'react-native-elements';
import Content from '_src/components/Content';
import {useUser} from '_src/hooks';
// import style from './Profile.style';

export type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const {signOut} = useUser();
  return (
    <Content>
      <Button title="Cerrar sesión" onPress={signOut} />
    </Content>
  );
};

export default Profile;
