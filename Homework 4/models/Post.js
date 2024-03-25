import { v4 as uuidv4 } from 'uuid';

class Post {
  constructor(title, content) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.createdAt = new Date().toISOString();
    this.updatedAt = null;
  }

  updateContent(newContent) {
    this.content = newContent;
    this.updatedAt = new Date().toISOString();
  }
}

export default Post;
