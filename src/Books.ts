import Book from './Book'

export default class Books
{
    private _booklist: Book[]

    public constructor( booklist: Book[] = [] )
    {
        this._booklist = booklist
    }

    public addBook( book: Book ): number
    {
        if( this.indexOfIsbn( book.isbn ) == -1 )
        {
            return this._booklist.push( book )
        }
        return -1
    }

    public getBooks(): Book[]
    {
        return this._booklist;
    }

    public indexOfBook( book: Book ): number
    {
        return this._booklist.indexOf( book )    
    }    
    public indexOfIsbn( isbn: string ): number
    {
        const filteredBooks: Book[] = this._booklist.filter( ( currentBook ) => currentBook.isbn == isbn )
        if( filteredBooks.length == 1 )
        {
            return this.indexOfBook( filteredBooks[ 0 ] )
        }
        return -1    
    }

    public getBookByIsbn( isbn: string ): Book | null
    {
        const filteredBooks: Book[] = this._booklist.filter( ( currentBook ) => currentBook.isbn == isbn )
        if( filteredBooks.length == 1 )
        {
            return filteredBooks[ 0 ]
        }
        return null
    }

    public getBookByIndex( index: number ): Book | null
    {
        if( index >= 0 && index < this._booklist.length )
        {
            return this._booklist[ index ]
        }
        return null
    }

    public get count(): number 
    {
        return this._booklist.length
    }

    public deleteBook( book: Book ): boolean
    {
        const index: number = this.indexOfBook( book )
        if( index != -1 )
        {
            this._booklist.splice( index, 1 )
            return true
        }
        return false
    }

    public deleteBookByIsbn( isbn: string ): boolean
    {
        const book: Book = this.getBookByIsbn( isbn )
        if( book != null )
        {
            return this.deleteBook( book )
        }
        return false
    }

    public updateBook( isbn: string, book: Book, allowInsert: boolean = false ): number
    {
        const index: number = this.indexOfIsbn( isbn )
        if( index != -1 )
        {
            this._booklist[ index ] = book
            return index
        }
        return -1
    }

    public save()
    {
        localStorage.setItem( 'booklist', JSON.stringify( this._booklist ) )
    }

    public load()
    {
        this._booklist = []
        const jsonBookList: string = localStorage.getItem( 'booklist' ) || ""
        if( jsonBookList != "" )
        {
            this._booklist = JSON.parse( jsonBookList ) as Book[]
        }
        
    }
}
