// api/register.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { peer_id, peer_addr } = req.body;

  if (!peer_id || !peer_addr) {
    return res.status(400).json({ error: 'peer_id 和 peer_addr 不能为空' });
  }

  // 内存存储（仅示例，重启会丢失）
  globalThis.peerRegistry = globalThis.peerRegistry || {};
  globalThis.peerRegistry[peer_id] = peer_addr;

  console.log(`✅ Peer 注册: ID=${peer_id}, ADDR=${peer_addr}`);

  return res.status(200).json({
    status: 'success',
    peer_id,
    peer_addr
  });
}