export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"POST only"});

  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const ex  = process.env.EXCHANGE || "OKX";
  const sym = process.env.SYMBOL   || "BTCUSD";
  if (!token || !chatId) return res.status(500).json({error:"Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID"});

  // TradingView 建議 payload 例子：
  // { "action":"long" | "short" | "flat", "price":12345.6, "conf":0.92, "note":"RRE" }
  const { action, price, conf, note } = req.body || {};
  if (!action) return res.status(400).json({error:"missing action"});

  const txt = `📡 V17-R99 信號（模擬）
交易所：${ex}
標的：${sym}
動作：${action.toUpperCase()}
價格：${price ?? "N/A"}
信心：${conf ?? "N/A"}
備註：${note ?? "-"}
時間：${new Date().toLocaleString("zh-TW")}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ chat_id: chatId, text: txt })
  });

  res.status(200).json({ ok:true });
}
