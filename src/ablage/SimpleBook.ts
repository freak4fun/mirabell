export interface IBook
{
    title?: string
    authors?: string[]
    pages?: number
    isbn: string
}

export function addAuthor( author: string, book: IBook ): boolean
{
    if( author != "" && book.authors.indexOf( author ) == -1 )
    {
        book.authors.push( author )
        return true
    }
    return false    
}

export function removeAuthor( author: string, book: IBook ): boolean
{
    if( author != "" && book.authors.indexOf( author ) == -1 )
    {
        book.authors.splice( book.authors.indexOf( author ), 1 )
        return true
    }
    return false
}

export function getBooksByIsbn( isbn: string, booklist: IBook[] ): IBook[]
{
    return booklist.filter( ( currentBook ) => currentBook.isbn == isbn )
}

export function addIfNotInList( booklist: IBook[], book: IBook ): boolean
{
    // bei 10 Stellen die 978 davor setzen
    // alle Sonderzeichen (-) entfernen
    if( book.isbn != '' && booklist.filter( ( currentBook ) => currentBook.isbn == book.isbn ).length == 0 )
    {
        booklist.push( book )
        return true
    }
    return false
}
