import axios from "axios";
import { command, isPrivate } from "../src/commands.js";
import config from "../config.js";

command(
  {
    name: "apk",
    desc: "Download APK based on the user's query.",
    usage: `${config.PREFIX}apk <app name>`,
    fromMe: isPrivate,
    react: true,
    type: "tools",
  },
  async (msg, match) => {
    try {
      if (!match) {
        return await msg.reply(
          `📦 *APK Downloader*\n\n` +
          `❗ Please provide an app name.\n` +
          `Example: ${config.PREFIX}apk WhatsApp`
        );
      }

      await msg.reply("🔍 Searching for APK, please wait...");

      const apiUrl = `https://api.nexoracle.com/downloader/apk?apikey=free_key@maher_apis&q=${encodeURIComponent(match)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (!result.result || !result.result.dllink) {
        return await msg.reply("⚠️ No valid download link found. Please try again later.");
      }

      const apkInfo = result.result;

      await msg.client.sendMessage(msg.jid, {
        document: { url: apkInfo.dllink },
        mimetype: "application/vnd.android.package-archive",
        fileName: `${apkInfo.name || "app"}.apk`,
        caption: `📱 ${apkInfo.name}\n📦 Package: ${apkInfo.package}\n📏 Size: ${apkInfo.size}\n🗓️ Last Updated: ${apkInfo.lastup}`
      });
    } catch (error) {
      console.error("APK Downloader Error:", error);
      await msg.reply(`❌ Error: ${error.message}`);
    }
  }
);