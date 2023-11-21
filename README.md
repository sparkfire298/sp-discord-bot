# sp-discord-bot
Fun Discord Bot relying on no intents - ultimately privacy-respecting overall

# Setup
*Requirements: Node.js v17 or higher, Git*

*Best works with Linux*

1. Clone the repository
```git clone https://github.com/sparkfire298/sp-discord-bot.git```

2. Navigate to the repository
```cd sp-discord-bot (or whatever you named it)```

3. Install packages
```npm install```
or
```sudo npm install```

4. Fill out config.json:
You can use Notepad, Visual Studio Code, or `nano`.
Nano:
```nano config.json```

5. Run deploy.js
```node deploy.js```
or
```sudo node deploy.js```

6. Start the bot
With Node:
```node .```

With PM2:
```pm2 start index.js``` or ```pm2 start index.js --name "name goes here"```

7. Invite to a server

# Features
- Lightweight
- Easy to modify, built on the [discord.js guide](https://v13.discordjs.guide) structure
- Requires no intents by default

# License
MIT License

Copyright (c) 2023 sparkfire298

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
