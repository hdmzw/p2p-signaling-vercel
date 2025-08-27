// api/peer.js

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { peer_id } = req.query; // 通过 ?peer_id=xxx 传递

  if (!peer_id) {
    return res.status(400).json({ error: '缺少 peer_id 参数' });
  }

  const registry = globalThis.peerRegistry || {};
  const addr = registry[peer_id];

  if (addr) {
    return res.status(200).json({
      status: 'success',
      peer_id,
      peer_addr: addr
    });
  } else {
    return res.status(404).json({
      status: 'error',
      message: `未找到 peer: ${peer_id}`
    });
  }
}