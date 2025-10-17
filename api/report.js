export default async function handler(req, res) {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID; // 用 @userinfobot 取得你的 chat_id
  const ex  = process.env.EXCHANGE || "OKX";
  const sym = process.env.SYMBOL   || "BTCUSD";

  if (!token || !chatId) return res.status(500).json({error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID"});

  const now = new Date().toLocaleString("zh-TW");
  const msg = `✅ V17-R99 雲端部署成功\n交易所：${ex}\n幣種：${sym}\n時間：${now}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ chat_id: chatId, text: msg })
  });

  res.status(200).json({ ok:true, message:"report sent" });
}
