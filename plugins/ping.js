
import { performance } from "perf_hooks";
import { command, isPrivate } from "../src/commands.js";
import config from "../config.js";

command(
  {
    name: "ping",
    desc: "Shows bot response speed",
    usage: `${config.PREFIX}ping`,
    fromMe: isPrivate,
    react: true,
    type: "info",
  },
  async (msg) => {
    try {
      const start = performance.now();
      const response = await msg.reply("📡 Measuring ping...");
      const end = performance.now();
      const pingTime = (end - start).toFixed(2);

      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      const upTimeText = `${hours}h ${minutes}m ${seconds}s`;

      const replyText = `
📶 Response Speed: ${pingTime} ms
⏱️ Bot Uptime: ${upTimeText}
`;

      await msg.client.sendMessage(
        msg.jid,
        {
          text: replyText.trim(),
          contextInfo: {
            externalAdReply: {
              title: "xᴄᴇʟ_ʙᴏᴛ | ᴘɪɴɢ",
              body: "ᴄᴏᴅᴇ ᴛʜᴇ ᴇᴀʀᴛʜ",
              thumbnailUrl: "https://i.ibb.co/mrhD35Yn/images-3.png",
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: false
            }
          }
        },
        { quoted: msg.raw }
      );
    } catch (err) {
      await msg.reply(`❌ Error while checking ping:\n${err.message}`);
    }
  }
);