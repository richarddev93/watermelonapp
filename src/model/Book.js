import {Model} from '@nozbe/watermelondb';
import {field, text, children} from '@nozbe/watermelondb/decorators';

export default class Books extends Model {
  static table = 'books';
  @field('id_book') idBook;
  @text('title') title;
  @text('body') body;
  @field('is_pinned') isPinned;
}
