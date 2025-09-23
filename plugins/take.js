import { command, isPrivate } from "../src/commands.js";
import { Sticker, StickerTypes } from "wa-sticker-formatter";
import config from "../config.js";

async function toSticker(msg, buffer, type, pack, author, targetJid) {
  const sticker = new Sticker(buffer, {
    pack: pack || "x3cl",
    author: author || "sαოα",
    type,
    quality: 70,
  });

  const stickerBuffer = await sticker.toBuffer();

  await msg.client.sendMessage(
    targetJid,
    { sticker: stickerBuffer },
    { quoted: msg.raw }
  );
}

command(
  {
    name: "take",
    desc: "steals stk and send to owner's DM",
    fromMe: isPrivate,
    react: true,
    type: "transform",
  },
  async (msg, match) => {
    if (!msg.quoted || !["stickerMessage", "imageMessage", "videoMessage"].includes(msg.quoted.type)) {
      return msg.reply("_Reply to a sticker, image, or video to rebrand it_");
    }

    const buffer = await msg.quoted.download();
    if (!buffer) return msg.reply("Failed to download media");

    const [packname, author] = match?.split("|").map(s => s.trim()) || [];
    const newPack = packname || "x3cl";
    const newAuthor = author || msg.pushName || "sαოα";

    let owner = config.OWNER;
    owner = `${owner}@s.whatsapp.net`;

    await toSticker(msg, buffer, StickerTypes.FULL, newPack, newAuthor, owner);
    await msg.reply("_Sticker sent to owner's DM_");
  }
);