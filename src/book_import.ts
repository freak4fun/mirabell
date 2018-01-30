const book_import = [
    // gelesen
    { isbn: '9783861902799', authors: [ 'Richard A. Clarke' ],  title: 'Break Point',                       pages: 317 },            
    { isbn: '9783404606931', authors: [ 'James Bowen' ],        title: 'Bob, der Streuner',                 pages: 252 },            
    { isbn: '9783442483440', authors: [ 'Dan Sehlberg' ],       title: 'Mona',                              pages: 512 },
    { isbn: '9783734100932', authors: [ 'Marc Elsberg' ],       title: 'ZERO - Sie wissen, was du tust',    pages: 496 },
    { isbn: '9783453317161', authors: [ 'Cixin Liu' ],          title: 'Die drei Sonnen',                   pages: 592 },            
    { isbn: '9783784433608', authors: [ 'James Douglas' ],      title: 'Totale Kontrolle',                  pages: 395 },            
    { isbn: '9783865522368', authors: [ 'Ben Coes' ],           title: 'Power Down - Zielscheibe USA',      pages: 608 },    
    { isbn: '9783492060806', authors: [ 'Andreas Brandhorst' ], title: 'Das Erwachen',                      pages: 736 },
    { isbn: '9783492266857', authors: [ 'Jeff Carlson' ],       title: 'Plasma',                            pages: 416 },            
    { isbn: '9783959811446', authors: [ 'Vernor Vinge' ],       title: 'Das Ende des Regenbogens',          pages: 450 },            
    { isbn: '9783596186143', authors: [ 'Barry Eisler' ],       title: 'Todescode',                         pages: 368 },            
    { isbn: '9783426305508', authors: [ 'Veit Etzold' ],        title: 'Dark Web',                          pages: 592 },
    { isbn: '9783492311113', authors: [ 'Frederik T. Olsson' ], title: 'Das Netz',                          pages: 672 },
    { isbn: '9783944305004', authors: [ 'Thore D. Hansen' ],    title: 'Silent Control',                    pages: 512 },            
    { isbn: '9783453316485', authors: [ 'Thomas Carl Sweterlitsch' ], title: 'Tomorrow & Tomorrow',         pages: 480 },            
    { isbn: '9783453316836', authors: [ 'Ramez Naam' ],         title: 'Crux',                              pages: 752 },           
    { isbn: '9783404206070', authors: [ 'Jim C. Hines' ],       title: 'Drei Engel für Armand',             pages: 445 },            
    { isbn: '9783426509760', authors: [ 'Anthony Francis' ],    title: 'Skindancer: Magisches Tattoo',      pages: 412 },
    { isbn: '9783404206353', authors: [ 'Stephan Russbült' ],   title: 'Die Oger',                          pages: 496 },            
    { isbn: '9783442480593', authors: [ 'Drew Chapman' ],       title: 'Der Analyst',                       pages: 544 },            
    { isbn: '9783442482184', authors: [ 'Drew Chapman' ],       title: 'Der Trader',                        pages: 544 },
    { isbn: '9783499253126', authors: [ 'Philip Kerr' ],        title: 'Das Wittgensteinprogramm',          pages: 410 },
    { isbn: '9783499267482', authors: [ 'Eugen Ruge' ],         title: 'Cabo de Gata',                      pages: 208 },
    { isbn: '9783426512890', authors: [ 'Chris Howard' ],       title: 'Der eiserne Wald',                  pages: 368 },
    { isbn: '9781503937147', authors: [ 'Barry Eisler' ],       title: 'Das allwissende Auge',              pages: 468 },
    { isbn: '9783499259180', authors: [ 'Daniel Suarez' ],      title: 'Kill Decision',                     pages: 496 },
    { isbn: '9783570309612', authors: [ 'James Dashner' ],      title: 'Tödliches Netz',                    pages: 416 },           
    { isbn: '9783570309636', authors: [ 'James Dashner' ],      title: 'Das Spiel ist aus',                 pages: 448 },            
    { isbn: '9783734101878', authors: [ 'Will Jordan' ],        title: 'Operation Black List',              pages: 544 },     
    { isbn: '9783734101731', authors: [ 'Bruce McCabe' ],       title: 'Unfehlbar',                         pages: 512 },            
    { isbn: '9783940626356', authors: [ 'William Hertling' ],   title: 'Avogadro Corp.',                    pages: 308 },            
    
    
    
    // Vorlage
//    { isbn: '', authors: [ '' ],       title: '',                        pages:  },
    
    
    // schon mal erfasst
//    { isbn: '9783833310058', authors: [ 'Karl Olsberg' ],       title: 'Enter',                             pages: 432 },
//    { isbn: '9783833309397', authors: [ 'Karl Olsberg' ],       title: 'Delete',                            pages: 464 },
//    { isbn: '9783746623672', authors: [ 'Karl Olsberg' ],       title: 'Das System',                        pages: 403 },
    
    // noch nicht
//    { isbn: '9783404207091', authors: [ 'Peter F. Hamilton' ],  title: 'Die Dämonenfalle',                  pages: 352 },            
    

    // unklar
    

//    { isbn: '9783499291333', authors: [ 'Daniel Suarez' ],      title: 'Bios',                              pages: 544 },
//    { isbn: '9783644442917', authors: [ 'Daniel Suarez' ],      title: 'Darknet',                           pages: 480 },
//    { isbn: '9783644525313', authors: [ 'Daniel Suarez' ],      title: 'Control',                           pages: 496 },
//    { isbn: '9783644442818', authors: [ 'Daniel Suarez' ],      title: 'Daemon',                            pages: 640 },
//    { isbn: '9783462307931', authors: [ 'Tom Hillenbrand' ],    title: 'Drohnenland',                       pages: 432 },
//    { isbn: '9783462308204', authors: [ 'Dave Eggers' ],        title: 'Der Circle',                        pages: 560 },
//    { isbn: '9783641074319', authors: [ 'Marc Elsberg' ],       title: 'BLACKOUT - Morgen ist es zu spät',  pages: 800 },
//    { isbn: '9783644557116', authors: [ 'Patrick Lee' ],        title: 'Das Signal',                        pages: 464 },
//    { isbn: '9783734100932', authors: [ 'Marc Elsberg' ],       title: 'ZERO - Sie wissen, was du tust',    pages: 496 },
//    { isbn: '9783841211309', authors: [ 'Karl Olsberg' ],       title: 'Mirror',                            pages: 400 }, 
//    { isbn: '9783827076731', authors: [ 'Karl Olsberg' ],       title: 'Delete',                            pages: 464 },          
//    { isbn: '9783833310058', authors: [ 'Karl Olsberg' ],       title: 'Enter',                             pages: 432 },            
//    { isbn: '9783746623672', authors: [ 'Karl Olsberg' ],       title: 'Das System',                        pages: 367 },            
//    { isbn: '9783746626895', authors: [ 'Karl Olsberg' ],       title: 'Glanz',                             pages: 400 },            
//    { isbn: '9783499239410', authors: [ 'Adam Fawer' ],         title: 'Null',                              pages: 585 },            
//    { isbn: '9783641140021', authors: [ 'James Dashner' ],      title: 'Gegen die Spielregeln',             pages: 416 },            
//    { isbn: '9783453315600', authors: [ 'Ramez Naam' ],         title: 'Nexus',                             pages: 624 },            
    
    
    

]