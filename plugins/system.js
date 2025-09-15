import { command, commands, isPrivate } from "../src/commands.js";
import config from "../config.js";
import { exec } from "child_process";

command(
  {
    name: "alive",
    desc: "Check if bot is online",
    usage: `${config.PREFIX}alive`,
    fromMe: isPrivate,
    react: true,
    type: "info",
  },
  async (msg, match) => {
    await msg.reply(" Bot is Active 🧃");
  }
);

command(
  {
    name: "uptime", 
    desc: "Shows bot uptime and status",
    usage: `${config.PREFIX}uptime`,
    fromMe: isPrivate,
    react: true,
    type: "info",
  },
  async (msg, match) => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const upTimeText = `${hours}h ${minutes}m ${seconds}s`;

    await msg.reply(`✅ Bot is online\nUp time: ${upTimeText}`);
  }
);

command(
  {
    name: "gitpull",
    desc: "update bot",
    usage: `${config.PREFIX}update`,
    react: false,
    type: "system",
  },
  async (msg, match) => {
    await msg.reply("_Updating Bot_");
    exec("git pull", (error, stdout, stderr) => {
      msg.reply(stdout || stderr);
      process.exit();
    });
  }
);

command(
  {
    name: "exec",
    desc: "run shell command",
    usage: `${config.PREFIX}exec <command>`,
    react: false,
    type: "system",
  },
  async (msg, match) => {
    if (!match) return await msg.reply("no command provided");
    exec(match, (error, stdout, stderr) => {
      msg.reply(stdout || stderr || "done");
    });
  }
);