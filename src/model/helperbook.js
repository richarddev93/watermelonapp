import database from '.';

const books = database.collections.get('books');
export const observeProducts = () => books.query().observe();
export const saveProduct = async ({title, idBook, note}) => {
  await database.write(async () => {
    const book = await database.get('books').create(post => {
      post.title = title;
      post.idBook = parseInt(idBook, 10);
      post.body = note;
    });

    return book;
  });
};
