# SMBrowserRNG

[![pokeCalcDiscord](https://discordapp.com/assets/07dca80a102d4149e9736d4b162cff6f.ico)](https://www.discord.gg/d8JuAvg)

> This Browser-Based RNG tool is a gateway to your dreams and mirror of the future.
>
> Welcome to RNG that is OS independent and platform agnostic.

## About the Project

  - Started by the pokeCalcNTR Devs
  - Being designed for Desktop and Mobile usage
  - Uses Node.js to develop
  - Only needs browser to use
  - Written with Love
  - Written in TypeScript

## Installing
1. Have Node.js and npm installed
2. Clone the repository
3. Install the development dependencies using the following command
```
npm install -d
```
## Development

### Compiling
```
npm run winCompile
npm run linCompile
```
"winCompile" and "linCompile" will tranpile the project's TypeScipt to JavaScript.

### Testing
```
npm run winTest
npm run linTest
```
"winTest" and "linTest" do the following things in order:
1. This will transpile all the TypeScript to JavaScript
2. Browserify this Node.js project to a Browser Compatible JavaScript
3. Start a server at http://127.0.0.1:9966 where you can view the project working

In addition to this, "test" will watch every .ts file, and will transpile, browserify, and restart the server when one is edited and saved.

### Building
```
npm run build
```
"build" will transpile the TypeScript to JavaScript, browserify the JavaScript, and save the whole project as "webbundle.js", then compress it to "webbundle.min.js".

### Cleaning
```
npm run winClean
npm run linClean
```
"winClean" and "linClean" will clean the .js files in the root folder.

## Credits
Thank you to all of the pokeCalcNTR Patrons!

@imaboy321 (EzPzStreamz) and @Admiral-Fish for helping develop this and pokeCalcNTR with me

/u/Shiny_Sylveon for designing the entire front end and css!

Everyone listed in the [pokeCalcNTR Thread's Credits](gbatemp.net/threads/wip-pokecalcntr-iv-and-nature-overlay-plugin-for-sun-and-moon.460524/)

@Quandra for their work with Gen 7 RNG and building [PokemonSunMoonRNGTool](https://github.com/Quandra/PokemonSunMoonRNGTool)

@wwwwwwzx for their work with Gen 7 RNG and building upon PokemonSunMoonRNGTool to make [SMEncounterRNGTool](https://github.com/wwwwwwzx/SMEncounterRNGTool)

RNG Reporter Founding Devs - Bill Young, Mike Suleski, and Andrew Ringer
