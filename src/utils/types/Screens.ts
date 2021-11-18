import {ParamListBase} from '@react-navigation/routers';
import {DashboardProps} from '_src/screens/Dashboard';
import {LoginProps} from '_src/screens/Login';
import {PlaylistListProps} from '_src/screens/PlaylistList';
import {ProfileProps} from '_src/screens/Profile';
import {RegisterProps} from '_src/screens/Register';
import {SearchProps} from '_src/screens/Search';
import {Playlist} from './Playlist';
import {Album, Artist} from './Songs';

export interface RootScreens extends ParamListBase {
  artist: {artist: Artist};
  dashboard: any;
  login: LoginProps;
  album: {album: Album};
  playlist: {playlist: Playlist};
  register: RegisterProps;
}

export interface DashboardScreens extends ParamListBase {
  home: DashboardProps;
  playlist: PlaylistListProps;
  search: SearchProps;
  profile: ProfileProps;
  dashboard: {screens: RootScreens};
}
