// Vercel 서버리스 함수: 유튜브 API 키를 서버에서만 사용합니다. (브라우저에는 키가 전달되지 않음)
const ALLOWED = {
  search: ['part', 'q', 'type', 'maxResults', 'order', 'videoEmbeddable', 'regionCode', 'relevanceLanguage', 'safeSearch', 'publishedAfter', 'pageToken'],
  videos: ['part', 'id']
};

module.exports = async (req, res) => {
  const key = process.env.YOUTUBE_API_KEY;
  const url = new URL(req.url, 'http://localhost');
  const path = url.searchParams.get('path');

  if (path === 'ping') return res.status(200).json({ ok: !!key });
  if (!key) return res.status(500).json({ error: { message: '서버에 YOUTUBE_API_KEY가 설정되지 않았어요.', errors: [{ reason: 'noServerKey' }] } });
  if (!ALLOWED[path]) return res.status(400).json({ error: { message: '허용되지 않은 요청이에요.', errors: [{ reason: 'badPath' }] } });

  const p = new URLSearchParams();
  ALLOWED[path].forEach(k => { const v = url.searchParams.get(k); if (v) p.set(k, v); });
  if (path === 'search') p.set('maxResults', String(Math.min(parseInt(p.get('maxResults') || '12', 10) || 12, 25)));
  p.set('key', key);

  try {
    const r = await fetch('https://www.googleapis.com/youtube/v3/' + path + '?' + p.toString());
    const body = await r.json();
    // 같은 검색은 1시간 동안 서버(CDN)에서 재사용 → 무료 할당량 절약
    if (r.ok) res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
    return res.status(r.status).json(body);
  } catch (e) {
    return res.status(502).json({ error: { message: '유튜브 서버에 연결하지 못했어요.', errors: [{ reason: 'upstream' }] } });
  }
};
