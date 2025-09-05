import { command, commands, isPrivate } from "../src/commands.js";
import config from "../config.js";
import { readMoreText } from "../src/utils/util.js";
import { exec } from "child_process";

command(
  {
    name: "alive",
    pattern: "alive",
    desc: "Shows bot uptime and status",
    usage: `${config.PREFIX}alive`,
    fromMe: isPrivate,
    react: true,
    type: "info",
  },
  async (msg, match) => {
    const response = await msg.reply("🧠 Checking bot status...");

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const upTimeText = `${hours}h ${minutes}m ${seconds}s`;

    const caption = `\`\`\`
╭───『 ⚡ BOT STATUS ⚡ 』───╮
│⏱️ Up time : ${upTimeText}
│📡 Status  : Online & Responsive
╰─────────────────────────╯
\`\`\``;

    await msg.client.sendMessage(msg.jid, {
      text: caption,
      edit: response.key,
    });
  }
);

command(
  {
    name: "menu",
    desc: "Display all bot commands by categories",
    usage: `${config.PREFIX}menu [category/command]`,
    type: "info",
    fromMe: false,
    react: true
  },
  async (msg, match) => {
    const prefix = config.PREFIX
    const botName = "e"
    const owner = "ex"
    const readMore = readMoreText()

    let [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      .split(",")

    if (match) {
      const query = match.toLowerCase()

      const cmd = commands.find(c => c.name?.toLowerCase() === query)
      if (cmd) {
        return await msg.reply(
          `\`\`\`Command: ${prefix}${cmd.name}
Description: ${cmd.desc || "No description"}
Usage: ${cmd.usage || "No usage"}
Category: ${cmd.type || "misc"}\`\`\``
        )
      }

      const categoryCommands = commands
        .filter(c => (c.type || "misc").toLowerCase() === query && c.name)
        .map(c => c.name)

      if (categoryCommands.length > 0) {
        let menu = `\`\`\`┌〈 xᴄᴇʟ_ʙᴏᴛ〉
│👤 ᴏᴡɴᴇʀ: ${owner}
│📡 ᴘʀᴇғɪx: ${prefix}
│📅 ᴅᴀᴛᴇ: ${date}
│📃 ᴄᴀᴛᴇɢᴏʀʏ: ${query.toUpperCase()}
│🧃 ᴄᴏᴍᴍᴀɴᴅs: ${categoryCommands.length}
╰════════════···▸\`\`\`\n${readMore}`

        menu += `\n\`\`\`┌〈 ${query.toUpperCase()} 〉\`\`\``
        categoryCommands
          .sort((a, b) => a.localeCompare(b))
          .forEach(cmdName => {
            menu += `\n│\`\`\`¤│▸ ${cmdName.trim()}\`\`\``
          })
        menu += `\n╰════════════···▸\n\n`
        menu += `\n\n\`\`\`ᴜsᴇʀ ʙᴏᴛ ʙʏ ᴄᴏᴅᴇ ᴛʜᴇ ᴇᴀʀᴛʜ\`\`\``

        return await msg.client.sendMessage(msg.jid, {
          image: { url: config.IMG },
          caption: ᴜsᴇʀʙᴏᴛ
        })
      }

      return await msg.reply(
        `"${query}" not found as a command or category. Use ${prefix}menu to see all categories.`
      )
    }

    let menu = `\`\`\`┌〈xᴄᴇʟ_ʙᴏᴛ〉
│👑 ᴏᴡɴᴇʀ: ${owner}
│🎐 ᴘʀᴇғɪx: ${prefix}
│📆 ᴅᴀᴛᴇ: ${date}
│💻 ᴄᴍᴅs: ${commands.filter(c => c.name).length}
╰════════════···▸\`\`\`\n${readMore}`

    const categories = [...new Set(commands.filter(c => c.name).map(c => c.type || "misc"))].sort()

    categories.forEach(cat => {
      menu += `\n\`\`\`┌〈 ${cat.toUpperCase()} 〉\`\`\``
      commands
        .filter(c => (c.type || "misc") === cat && c.name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(c => {
          menu += `\n│\`\`\`¤│▸ ${c.name.trim()}\`\`\``
        })
      menu += `\n╰───────\n\n`
    })

    menu += `\n\n\`\`\`ᴜsᴇʀ ʙᴏᴛ ʙʏ ᴄᴏᴅᴇ ᴛʜᴇ ᴇᴀʀᴛʜ\`\`\``

    return await msg.client.sendMessage(
      msg.jid,
      {
        text: menu,
        contextInfo: {
          externalAdReply: {
            title: "ᴜsᴇʀʙᴏᴛ | ᴍᴇɴᴜ",
            body: "ᴄᴏᴅᴇ ᴛʜᴇ ᴇᴀʀᴛʜ",
            thumbnailUrl: "http://cdn-haki.zone.id/files/zhQhjM.png",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: msg.raw }
    )
  }
)


command(
    {
        name: "gitpull",
        desc: "update bot",
        usage: `${config.PREFIX}update`,
        react: false,
        type: "system",
    },
    async (msg, match) => {
        await msg.reply("_Updating Bot_")
        exec("git pull", (error, stdout, stderr) => {
            msg.reply(stdout || stderr)
            process.exit()
        })
    }
)


command(
    {
        name: "exec",
        desc: "run shell command",
        usage: `${config.PREFIX}exec <command>`,
        react: false,
        type: "system",
    },
    async (msg, match) => {
        if (!match) return await msg.reply("no command provided")
        exec(match, (error, stdout, stderr) => {
            msg.reply(stdout || stderr || "done")
        })
    }
)
