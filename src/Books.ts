import Book from './Book'

export default class Books
{
    private _booklist: Book[]

    public constructor( booklist: Book[] = [] )
    {
        this._booklist = booklist
        //console.log( this._booklist )
    }

    public addBook( book: Book ): number
    {
        if( this.indexOfIsbn( book.isbn ) == -1 )
        {
            return this._booklist.push( book )
        }
        return -1
    }

    // addBooks
    public setBooks( booklist: Book[] )
    {
        for( let b of booklist ) {
            const currentBook = b as any
            this.addBook( new Book( currentBook._isbn, currentBook._title, currentBook._authors, currentBook._pages ) )
        }
        
    }

    // gwtAllBooks
    public getBooks(): Book[]
    {
        return this._booklist;
    }

    public indexOfBook( book: Book ): number
    {
        return this.indexOfIsbn( book.isbn )    
    }   

    public indexOfIsbn( isbn: string ): number
    {   
        return this._booklist.findIndex( ( element ) => element.isbn == isbn )
    }

    public getBookByIsbn( isbn: string ): Book | null
    {
        const index = this._booklist.findIndex( ( element ) => element.isbn == isbn )
        return this.getBookByIndex( index )
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

    public deleteBookByIsbn( isbn: string ): boolean
    {
        const index: number = this.indexOfIsbn( isbn )
        if( index != -1 )
        {
            this._booklist.splice( index, 1 )
            return true
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
