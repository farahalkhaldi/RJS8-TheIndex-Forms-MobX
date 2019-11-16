import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com/api/"
});

function errToArray(err) {
  return Object.keys(err).map(key => `${key}: ${err[key]}`);
}



class BookStore {
  books = [];

  query = "";

  loading = true;

  errors = null;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) { }
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);

  addBook = async (newBook, author) => {
    try {
      const newObj = {
        title: newBook.title,
        color: newBook.color,
        authors: [author]
      };
      const res = await instance.post("/books/", newObj);
      const newStuff = res.data;
      this.books.unshift(newStuff);
      this.errors = null;
      console.log("response", newStuff);
    } catch (err) {
      this.errors = errToArray(err.response.data);
    }
  };
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  errors: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
