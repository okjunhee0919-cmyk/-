# 앵글(ANGLE) 배포 방법 (Vercel, 무료)

구조: index.html(화면) + api/youtube.js(서버 함수). 유튜브 API 키는 서버에만 있고, 방문자에게는 보이지 않습니다.

## 1. 깃허브에 올리기
1. github.com 에서 새 저장소(repository)를 만듭니다. 이름 예: angle
2. 이 폴더의 파일 전체(index.html, api 폴더, package.json, .gitignore, README.md)를 올립니다.
   (웹에서 "Add file → Upload files"로 끌어다 놓으면 됩니다)

## 2. Vercel에 연결하기
1. vercel.com 에 깃허브 계정으로 로그인합니다.
2. "Add New → Project"에서 방금 만든 저장소를 선택하고 Import 합니다.
3. 설정은 건드리지 말고, 배포 전에 "Environment Variables"를 엽니다.
   - Name: YOUTUBE_API_KEY
   - Value: 구글 클라우드에서 만든 API 키(AIza...로 시작)
4. Deploy 를 누릅니다. 1분 정도 뒤 주소가 나옵니다. (예: angle-xxxx.vercel.app)

## 3. 확인
- 사이트를 열었을 때 위쪽에 "샘플 화면" 안내가 없고, 검색하면 실제 유튜브 영상이 나오면 성공입니다.
- 안내가 보이면: 환경변수 이름이 정확히 YOUTUBE_API_KEY 인지 확인한 뒤, Vercel의 Deployments → Redeploy 를 누릅니다. (환경변수는 저장 후 다시 배포해야 적용됩니다)

## 4. 키를 안전하게 쓰는 팁 (선택)
- 구글 클라우드 → 사용자 인증 정보 → 키 → "API 제한"에서 "YouTube Data API v3"만 선택해 두세요.
- 키를 코드나 깃허브에 직접 적지 마세요. 환경변수로만 넣습니다.

## 내 컴퓨터에서 먼저 테스트하려면
1. Node.js 설치 후 이 폴더에서 `cp .env.example .env` 하고 .env 안에 키를 넣습니다.
2. `npx vercel dev` 를 실행하고 http://localhost:3000 을 엽니다.
(index.html을 더블클릭해서 열면 서버가 없어서 샘플 화면만 나옵니다)

## 무료 한도
유튜브 무료 한도는 하루 검색 약 100회입니다. 서버가 같은 검색을 1시간 동안 저장해 두고 재사용해서, 방문자가 같은 검색어를 입력하면 한도가 줄지 않습니다.
