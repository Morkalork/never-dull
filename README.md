# Never Dull

### Basic structure and idea:
Npm is a great distribution system and by making plugins npm modules it would make distribution of levels easier than [INSERT ALL OTHER SUGGESTIONS]. All you need to fetch is:
 * never-dull (server)
 * never-dull-level-[NAME]
 * never-dull-level-[NAME2]

Once you've downloaded the server you download a bunch of levels that follow a particular interface and feed them to the server. Once you start the server up it will digest the level-modules and build a game structure that is reached via a RESTful interface. 

The server itself won't be very complex  and really only has two tasks; digest levels and handle incoming calls and map them to the levels.
A level should follow a very basic interface looking something like this:

```javascript
export class IChallenge {
  /** 
   *    @type   {string}    The name of the plugin, used as REST base (such as http://localhost/never-dull/NAME)
   */
  get name() {}

  /**
   *    @type   {string}    The description for the plugin
   */
  get description() {}

  /**
   *    @type   {string}    Instructions for this plugin, can use line break (\n) and markdown
   */
  get instructions() {}

  /**
   *    @type   {int}   The difficulty level of the Challenge on a scale of 1 to 10. 
   *    Novice=1, Beginner=2, Basic=3, Medium=4, Hard=5, Tough=6, Very Hard=7, Insane=8, Extreme=9, Impossible=10
   */
  get difficulty() {}

  /**
   *    @type   {string[]}  An array of (thought through) types to further describe this Challenge
   *    ex. Mathematical, String Parsing, Logical, Brute Force, Encoding, Graph Theory, etc
   */
  get type() {}


  /**
   *    Handle get requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  get(request, response) // Handle incoming requests and write to the response stream

  /**
   *    Handle post requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  post(request, response)

/**
   *    Handle put requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  put(request, response)

/**
   *    Handle delete requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  delete(request, response)
}
```

