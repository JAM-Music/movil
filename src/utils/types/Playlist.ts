import Doc from './Doc';
import {Song} from './Songs';

export interface Playlist extends Doc {
  title: string;
  image: string;
  songs?: Array<Song>;
}
