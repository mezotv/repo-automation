const { Octokit } = require("@octokit/core");
const { schedule } = require('node-cron')
const  ping  = require('ping');

require("dotenv").config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN_1
})

console.log("Auto maintainer is running!");

schedule("0 1 0 * * *", function () {
  console.log("Updating Repo");
  post()
});

let array = [];
let array1 = [];

const post = async () => {

const hosts = [
"top.gg",
"discordbotlist.com",
"discord-botlist.eu",
"voidbots.net",
"discords.com",
"botlist.me",
"discord.bots.gg",
"infinitybots.gg",
"stellarbotlist.com",
"rovelstars.com",
"blist.xyz",
"radarcord.net",
"consteagle.com",
"bladelist.gg",
"discordz.gg",
"fateslist.xyz",
"discordlist.gg",
"discordservices.net",
"discordlabs.org",
"vipercord.com"
];

for(let host of hosts){
  let res = await ping.promise.probe(host);
  array.push(Math.round(res.avg))

  array1.push(res.alive ? '🟢' : '🔴')
}

const content = 
`
# Discord Bot list's

This list features every botlist out there that is working as of now. This repo is automatically updated every day.

## Botlists:

| Name              | Website                         | Discord                 | Ping | Status |
| ----------------- | ------------------------------- | ---------------------------| --------| ------|
| Top.gg | [Website](https://top.gg) | [Discord Invite](https://discord.com/invite/EYHTgJX) | ${array[0]}ms | ${array1[0]} |
| Discord bot list | [Website](https://discordbotlist.com) | [Discord Invite](https://discord.com/invite/EYHTgJX) | ${array[1]}ms | ${array1[1]} |
| Discord-botlist.eu | [Website](https://discord-botlist.eu) | [Discord Invite](https://discord.com/invite/EYHTgJX) | ${array[2]}ms | ${array1[2]} |
| Void Bots | [Website](https://voidbots.net) | [Discord Invite](https://discord.com/invite/suH3VeUBXk) | ${array[3]}ms | ${array1[3]} |
| Discords | [Website](https://discords.com/bots) | [Discord Invite](https://discord.com/invite/4g9NHYNbTS) | ${array[4]}ms | ${array1[4]} |
| Botlist | [Website](https://botlist.me) | [Discord Invite](https://discord.com/invite/hdK4ya5eVv) | ${array[5]}ms | ${array1[5]} |
| Discord Bots | [Website](https://discord.bots.gg) | [Discord Invite](https://discord.com/invite/0cDvIgU2voWn4BaD) | ${array[6]}ms | ${array1[6]} |
| Infinity Bot list | [Website](https://infinitybots.gg) | [Discord Invite](https://discord.com/invite/KBCRuBKrHe) | ${array[7]}ms | ${array1[7]} |
| Stellar Bot list | [Website](https://stellarbotlist.com) | [Discord Invite](https://discord.com/invite/hAYNuDRMwy) | ${array[8]}ms | ${array1[8]} |
| Rovel Discord List | [Website](https://rovelstars.com) | [Discord Invite](https://discord.com/invite/E6PhZK4tU9) | ${array[9]}ms | ${array1[9]} |
| Blist | [Website](https://blist.xyz) | [Discord Invite](https://discord.com/invite/PK8J6nzQMR) | ${array[10]}ms | ${array1[10]} |
| Radar Cord |  [Website](https://radarcord.net/)| [Discord Invite](https://discord.com/invite/rKagYEUP5G) | ${array[11]}ms | ${array1[11]} |
| Const Eagle | [Website](https://consteagle.com)| [Discord Invite](https://discord.com/invite/vXTXQPsErP) | ${array[12]}ms | ${array1[12]} |
| Bladelist | [Website](https://bladelist.gg) | [Discord Invite](https://discord.com/invite/SJN3AZgFvY) | ${array[13]}ms | ${array1[13]} |
| Discordz | [Website](https://discordz.gg) | [Discord Invite](https://discord.com/invite/5Z4PC6gnZ2) | ${array[14]}ms | ${array1[14]} |
| Fates List | [Website](https://fateslist.xyz) | [Discord Invite](https://discord.com/invite/RDwaa3Jr3s) | ${array[15]}ms | ${array1[15]} |
| Discord List | [Website](https://discordlist.gg/) | [Discord Invite](https://discord.com/invite/XbuJ6VH) | ${array[16]}ms | ${array1[16]} |
| Discord Services | [Website](https://discordservices.net) | [Discord Invite](https://discord.com/invite/a5h4HBNM8g) | ${array[17]}ms | ${array1[17]} |
| Discord Labs | [Website](https://bots.discordlabs.org/) | [Discord Invite](https://discord.com/invite/rmPNvNJ) | ${array[18]}ms | ${array1[18]} |
| Vipercord | [Website](https://vipercord.com/) | [Discord Invite](https://discord.com/invite/Fp8CnqyWW8) | ${array[19]}ms | ${array1[19]} |

## If you got a botlist that you want to add here simply open a pull request and it will be here as soon as possible!


## Contributors

![CloneRepo](https://contrib.rocks/image?repo=mezotv/Discord-Bot-Lists)
`

octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
  owner: "mezotv",
  repo: "Discord-Bot-Lists",
  path: "README.md",
}).then((res) => { 
octokit.request('PUT /repos/mezotv/Discord-Bot-Lists/contents/{path}', {
  owner: 'mezotv',
  repo: 'Discord-Bot-Lists',
  path: 'README.md',
  message: `Daily Update ${new Date().toLocaleDateString()}`,
  content: Buffer.from(content).toString('base64'),
  sha: res.data.sha,
})
 })
}