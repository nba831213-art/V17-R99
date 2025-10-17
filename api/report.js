export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const exchange = process.env.EXCHANGE || "OKX";
  const symbol = process.env.SYMBOL || "BTCUSD";
  const mode = process.env.MODE || "DEMO";

  if (!token || !chatId) {
    return res.status(500).json({ error: "Missing Telegram config" });
  }

  const message = `✅ V17-R99 雲端部署成功
伺服器：${exchange}
幣種：${symbol}
模式：${mode}
時間：${new Date().toLocaleString("zh-TW")}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    res.status(200).json({ ok: true, message });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
