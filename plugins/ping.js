import os from "os";
import { performance } from "perf_hooks";
import { command, isPrivate } from "../src/commands.js";
import config from "../config.js";

command(
  {
    name: "ping",
    desc: "Shows bot response speed and system info",
    usage: `${config.PREFIX}ping`,
    fromMe: isPrivate,
    react: true,
    type: "info",
  },
  async (msg, match) => {
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

      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;

      const memoryUsage = process.memoryUsage();
      const memStats = Object.keys(memoryUsage)
        .map(key => `${key}: ${(memoryUsage[key] / 1024 / 1024).toFixed(2)} MB`)
        .join("\n");

      const cpus = os.cpus();
      const cpuModel = cpus[0]?.model.trim();
      const cpuSpeed = cpus[0]?.speed;

      const replyText = `
Response Speed: ${pingTime} _Milliseconds_

Runtime: ${upTimeText}

💻 Info Server
RAM: ${(usedMem / 1024 / 1024).toFixed(2)} MB / ${(totalMem / 1024 / 1024).toFixed(2)} MB

_NodeJS Memory Usage_
${memStats}

_Total CPU Usage_
${cpuModel} (${cpuSpeed} MHz)
`;

      await msg.client.sendMessage(msg.jid, {
        text: replyText.trim(),
        edit: response.key,
      });
    } catch (err) {
      await msg.reply(`❌ Error while checking ping:\n${err.message}`);
    }
  }
);