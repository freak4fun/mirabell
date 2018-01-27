import Book from './Book'

export default class Books
{
    private _booklist: Book[]

    public constructor( booklist: Book[] = [] )
    {
        this._booklist = booklist
    }

    public addBook( book: Book )
    {
        if( this.getBooksByIsbn( book.isbn ) == [] )
        {
            this._booklist.push( book )
        }
    }

    public getBookList(): Book[]
    {
        return this._booklist;
    }

    public indexOfBook( book: Book ): number
    {
        return this._booklist.indexOf( book )    
    }

    public getBooksByIsbn( isbn: string ): Book[]
    {
        return this._booklist.filter( ( currentBook ) => currentBook.isbn == isbn )
    }

    public saveBookList()
    {
        localStorage.setItem( 'booklist', JSON.stringify( this._booklist ) )
    }

    public loadBookList()
    {
        this._booklist = []
        const jsonBookList: string = localStorage.getItem( 'booklist' ) || ""
        if( jsonBookList != "" )
        {
            this._booklist = JSON.parse( jsonBookList ) as Book[]
        }
        
    }
}