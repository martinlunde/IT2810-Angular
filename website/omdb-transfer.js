//Load dependencies
const mongoose = require('mongoose');
const http = require('http');

//Connect to database: movies
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/movies', { useMongoClient: true });
const db = mongoose.connection;

//Load movie model
const model = require('./models');
const movie = model.Movie;

const omdb = 'http://www.omdbapi.com/?apikey=8fda5bb&' + 't=Star+Wars+the+last+jedi&' + 'type=movie';

//Check if connected to database
db.on('error', err => {
    console.log('Error while connecting to DB: ${err.message}') ;
});
db.once('open', () => {
    console.log('Server connected successfully to DB!');
});

mongoose.connection.collections['movies'].drop( function(err) {
    console.log('collection dropped');
});

let omdbData = '';
http.get(omdb, (res) => {
    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
        omdbData += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
        omdbData = JSON.parse(omdbData);
        let new_movie = new movie({
            title: omdbData.Title,
            year:  omdbData.Year,
            runtime: omdbData.Runtime,
            genre: omdbData.Genre,
            director: omdbData.Director,
            actors: omdbData.Actors,
            plot: omdbData.Plot,
            poster: omdbData.Poster,
            readMore: omdbData.Website,
        });
        db.collection('movies').save(new_movie);
        console.log(new_movie);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

list_of_movies = [
    "Star+Wars:+The+Last+Jedi",
    "Justice+League",
    "Kingsman:+The+Golden+Circle",
    "The+Dark+Tower",
    "Thor:+Ragnarok",
    "Baby+Driver",
    "War+for+the+Planet+of+the+Apes",
    "The+New+Mutants",
    "The+Foreigner",
    "Wonder+Woman",
    "Pacific+Rim+Uprising",
    "Spider-Man:+Homecoming",
    "The+Mountain+Between+Us",
    "American+Made",
    "Pirates+of+the+Caribbean:+Dead+Men+Tell+No+Tales",
    "Geostorm",
    "American+Assassin",
    "Transformers:+The+Last+Knight",
    "Avengers:+Infinity+War",
    "Kingsman:+The+Secret+Service",
    "Dunkirk",
    "Guardians+of+the+Galaxy+Vol.+2",
    "Baywatch",
    "Atomic+Blonde",
    "Jurassic+World:+Fallen+Kingdom",
    "The+Emoji+Movie",
    "My+Little+Pony:+The+Movie",
    "The+LEGO+Ninjago+Movie",
    "Sing",
    "Moana",
    "Despicable+Me+3",
    "Loving+Vincent",
    "Captain+Underpants:+The+First+Epic+Movie",
    "Trolls",
    "The+Nightmare+Before+Christmas",
    "Cars+3",
    "Frozen",
    "Your+Name",
    "Zootopia",
    "The+Boss+Baby",
    "The+Lion+King",
    "The+LEGO+Batman+Movie",
    "Pokémon+the+Movie:+I+Choose+You!",
    "Aladdin",
    "Mulan",
    "Coraline",
    "Sausage+Party",
    "The+Secret+Life+of+Pets",
    "Coco",
    "Spirited+Away",
    "The+Babysitter",
    "Better+Watch+Out",
    "Girls+Trip",
    "Battle+of+the+Sexes",
    "Home+Again",
    "Hocus+Pocus",
    "The+Big+Sick",
    "The+Hitman's+Bodyguard",
    "Deadpool+2",
    "The+Meyerowitz+Stories+(New+and+Selected)",
    "Why+Him?",
    "La+La+Land",
    "The+House",
    "Jumanji:+Welcome+to+the+Jungle",
    "Spielberg",
    "Architects+of+Denial",
    "Icarus",
    "Gaga:+Five+Foot+Two",
    "Rocco",
    "The+Death+and+Life+of+Marsha+P.+Johnson",
    "Long+Shot",
    "Hot+Girls+Wanted",
    "Earth:+One+Amazing+Day",
    "After+Porn+Ends+2",
    "Unacknowledged",
    "Generation+Iron+2",
    "DC's+Legends+of+Tomorrow:+Their+Time+Is+Now",
    "Bobbi+Jene",
    "Kedi",
    "Kingdom+of+Us",
    "What+the+Health",
    "Voyage+of+Time:+Life's+Journey",
    "Kingsman:+The+Secret+Service+Revealed",
    "Faces+Places",
    "Fahrenheit+11/9",
    "Jackass:+The+Movie",
    "Ice+Guardians",
    "After+Porn+Ends",
    "Steve+McQueen:+American+Icon",
    "Beauty+and+the+Beast",
    "Goodbye+Christopher+Robin",
    "Fantastic+Beasts+and+Where+to+Find+Them",
    "Harry+Potter+and+the+Sorcerer's+Stone",
    "The+Princess+Bride",
    "Charlie+and+the+Chocolate+Factory",
    "Miss+Peregrine's+Home+for+Peculiar+Children",
    "The+Goonies",
    "The+Stray",
    "Wonderstruck",
    "E.T.+the+Extra-Terrestrial",
    "The+Big+Sleep",
    "Dial+M+for+Murder",
    "High+Sierra",
    "They+Won't+Believe+Me",
    "Sunset+Blvd.",
    "Key+Largo",
    "Double+Indemnity",
    "Scarface",
    "The+Maltese+Falcon",
    "The+Third+Man",
    "The+Bigamist",
    "Strangers+on+a+Train",
    "Touch+of+Evil",
    "The+Night+of+the+Hunter",
    "The+Killing",
    "Notorious",
    "Out+of+the+Past",
    "Detour",
    "Gilda",
    "Gaslight",
    "Laura",
    "The+Lineup",
    "The+House+on+Telegraph+Hill",
    "Spellbound",
    "The+Killers",
    "It",
    "The+Snowman",
    "Gerald's+Game",
    "Happy+Death+Day",
    "Mother!",
    "Jigsaw",
    "Cult+of+Chucky",
    "Flatliners",
    "Annabelle:+Creation",
    "Leatherface",
    "Jeepers+Creepers+III",
    "Alien:+Covenant",
    "Friday+the+13th",
    "Amityville:+The+Awakening",
    "The+Bad+Batch",
    "Get+Out",
    "The+Crucifixion",
    "47+Meters+Down",
    "Split",
    "It+Comes+at+Night",
    "The+Shape+of+Water",
    "The+Greatest+Showman",
    "The+Rocky+Horror+Picture+Show",
    "Robin+Hood:+Men+in+Tights",
    "Grease",
    "Mary+Poppins+Returns",
    "Annie",
    "Mamma+Mia!+Here+We+Go+Again",
    "Les+Misérables",
    "Willy+Wonka+&+the+Chocolate+Factory",
    "The+Wizard+of+Oz",
    "A+Star+Is+Born",
    "Breathe",
    "A+Ghost+Story",
    "Nocturnal+Animals",
    "Call+Me+by+Your+Name",
    "Our+Souls+at+Night",
    "Titanic",
    "Deadpool",
    "Forrest+Gump",
    "Fifty+Shades+Darker",
    "Me+Before+You",
    "The+Little+Hours",
    "Fifty+Shades+of+Grey",
    "Twilight",
    "American+Beauty",
    "The+Notebook",
    "Never+Let+Me+Go",
    "Sleeping+with+Other+People",
    "I,+Tonya",
    "Southpaw",
    "Unbroken",
    "Bleed+for+This",
    "Creed",
    "The+Karate+Kid",
    "Goon:+Last+of+the+Enforcers",
    "Borg+McEnroe",
    "The+Sandlot",
    "Little+Giants",
    "The+Blind+Side",
    "Rocky",
    "Warrior",
    "Remember+the+Titans",
    "Hands+of+Stone",
    "Cars",
    "Rush",
    "Creed+II",
    "She's+the+Man",
    "Dangal",
    "Jerry+Maguire",
    "Rocky+Balboa",
    "Point+Break",
    "The+Beguiled",
    "The+Man+with+the+Iron+Heart",
    "Hacksaw+Ridge",
    "Inglourious+Basterds",
    "Thank+You+for+Your+Service",
    "War+Dogs",
    "Darkest+Hour",
    "Pan's+Labyrinth",
    "Megan+Leavey",
    "Incendies",
    "Empire+of+the+Sun",
    "Saving+Private+Ryan",
    "Allied",
    "Braveheart",
    "Apocalypse+Now",
    "The+Wall",
    "13+Hours",
    "Full+Metal+Jacket",
    "Churchill",
    "The+Mummy",
    "Star+Wars:+The+Force+Awakens",
    "xXx:+Return+of+Xander+Cage",
    "Suicide+Squad",
    "Professor+Marston+and+the+Wonder+Women",
    "Victoria+and+Abdul",
    "The+Irishman",
    "Marshall",
    "Only+the+Brave",
    "Molly's+Game",
    "6+Below:+Miracle+on+the+Mountain",
    "Stronger",
    "The+Disaster+Artist",
    "Hidden+Figures",
    "Schindler's+List",
    "The+Lost+City+of+Z",
    "The+Wolf+of+Wall+Street",
    "Lion",
    "My+Friend+Dahmer",
    "Goodfellas",
    "Gotti",
    "Wind+River",
    "Murder+on+the+Orient+Express",
    "Replicas",
    "Brawl+in+Cell+Block+99",
    "What+Happened+to+Monday",
    "Suburbicon",
    "The+Shawshank+Redemption",
    "Security",
    "Wheelman",
    "The+Book+of+Henry",
    "The+Dark+Knight",
    "Prisoners",
    "Pulp+Fiction",
    "The+Godfather",
    "Suburra",
    "Sicario",
    "Roman+J.+Israel,+Esq.",
    "Annihilation",
    "King+Arthur:+Legend+of+the+Sword",
    "Wish+Upon",
    "Star+Wars:+Episode+IV+-+A+New+Hope",
    "Valerian+and+the+City+of+a+Thousand+Planets",
    "Assassin's+Creed",
    "6+Days",
    "The+Big+Short",
    "The+Death+of+Stalin",
    "The+Post",
    "Silence",
    "Zodiac",
    "The+Founder",
    "Detroit",
    "First+They+Killed+My+Father",
    "There+Will+Be+Blood",
    "Patriots+Day",
    "American+Satan",
    "Almost+Famous",
    "Pitch+Perfect+3",
    "Whiplash",
    "Dirty+Dancing",
    "Song+to+Song",
    "Bohemian+Rhapsody",
    "All+Eyez+on+Me",
    "Pitch+Perfect",
    "Footloose",
    "Pitch+Perfect+2",
    "8+Mile",
    "Brad's+Status",
    "The+Pianist",
    "The+Blues+Brothers",
    "Straight+Outta+Compton",
    "Secret+Superstar",
    "Amadeus",
    "August+Rush",
    "Hairspray",
    "School+of+Rock",
    "Blade+Runner+2049",
    "Arrival",
    "Walking+Out",
    "The+Killing+of+a+Sacred+Deer",
    "Cold+Moon",
    "Blade+Runner",
    "Overdrive",
    "The+Magnificent+Seven",
    "The+Hateful+Eight",
    "Django+Unchained",
    "Hell+or+High+Water",
    "The+Revenant",
    "Brimstone",
    "The+Good,+the+Bad+and+the+Ugly",
    "Blazing+Saddles",
    "Westworld",
    "Hostiles",
    "Bone+Tomahawk",
    "Tombstone",
    "True+Grit",
    "Once+Upon+a+Time+in+the+West",
    "Unforgiven",
    "Jeremiah+Johnson",
    "Legends+of+the+Fall",
    "Dances+with+Wolves",
    "A+Million+Ways+to+Die+in+the+West",
    "Young+Guns",
    "The+Ridiculous+6",
    "Justice",
    "Big+Jake",
];
