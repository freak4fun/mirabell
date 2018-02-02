export default class Book
{
    private _title: string
    private _authors: string[]
    private _pages: number
    private _isbn: string

    public constructor( isbn: string, title: string = '', authors: string[] = [], pages: number = 0 )
    {
        this._title = title
        this._authors = authors
        this._isbn = isbn
        this._pages = pages
    }

    public getBookData(): Object 
    {
        return { title: this._title, authors: this._authors, pages: this._pages, isbn: this._isbn }
    }

    public addAuthor( author: string ): boolean
    {
        if( author != "" && this._authors.indexOf( author ) == -1 )
        {
            this._authors.push( author )
            return true
        }
        return false
    }
   
    public removeAuthor( author: string ): boolean
    {
        if( author != "" && this._authors.indexOf( author ) == -1 )
        {
            this._authors.splice( this._authors.indexOf( author ), 1 )
            return true
        }
        return false
    }

    public set author( newAuthor: string )
    {
        this._authors[ 0 ] = newAuthor
    }


    public get author(): string
    {
        return this._authors[ 0 ]
    }

    public set title( newtitle: string )
    {
        this._title = newtitle
    }

    public get title(): string
    {
        return this._title
    }

    public set isbn( newIsbn: string )
    {
        this._isbn = newIsbn
    }

    public get isbn(): string
    {
        return this._isbn
    }

    public set pages( newPages: number )
    {
        this._pages = newPages
    }

    public get pages(): number
    {
        return this._pages
    }
}