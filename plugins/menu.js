import { command, commands } from "../src/commands.js";
import config from "../config.js";
import { readMoreText } from "../src/utils/util.js";

command(
  {
    name: "tmenu",
    desc: "Display all bot commands",
    usage: `${config.PREFIX}menu`,
    type: "info",
    fromMe: false,
    react: true
  },
  async (msg) => {
    const prefix = config.PREFIX;
    const botName = "ßð†lêr";
    const owner = config.ownername || "ᴇxᴄᴇʟ";
    const readMore = readMoreText();

    let [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: "Africa/Lagos" })
      .split(",");

    let menu = `\`\`\`┌〈${botName}〉
│≛ ᴏᴡɴᴇʀ: ${owner}
│≛ ᴘʀᴇғɪx: ${prefix}
│≛ ᴅᴀᴛᴇ: ${date}
│≛ ᴛɪᴍᴇ: ${time}
│≛ ᴄᴏᴍᴍᴀɴᴅs: ${commands.filter(c => c.name).length}
╰════════════···▸\`\`\`\n${readMore}`;

    const categories = [...new Set(commands.filter(c => c.name).map(c => c.type || "misc"))].sort();

    categories.forEach(cat => {
      menu += `\n\`\`\`┌〈 ${cat.toUpperCase()} 〉\`\`\``;
      commands
        .filter(c => (c.type || "misc") === cat && c.name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(c => {
          menu += `\n│\`\`\`≛︱▸ ${c.name.trim()}\`\`\``;
        });
      menu += `\n╰════════════···▸\n\n\n`;
    });

    menu += `\n\n\`\`\` ʜᴇʏ ɪ'ᴍ ᴛʜᴇ ʙᴏᴛʟᴇʀ 🧃\`\`\``;

    return await msg.client.sendMessage(
      msg.jid,
      {
        text: menu,
        contextInfo: {
          externalAdReply: {
            title: "UserBot | Menu",
            body: "XCEL_BOT",
            thumbnailUrl: "https://i.ibb.co/chdzBSqV/copilot-image-1757776002589.png",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: msg.raw }
    );
  }
);