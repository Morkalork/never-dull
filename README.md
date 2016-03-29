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
export default class {
	name(){},  // The uniquename of the plugin (used in url such as http://localhost/never-dull/NAME)
    run(request, response), // Handle incoming requests and write to the response stream

}
```

