import fs from 'fs';
import path from 'path';

export default async function getPostText(): Promise<string> {
  // 1. YAML 파일에서 지정한 QUOTE_FILE 이름을 가져옵니다 (기본값: quotes.txt)
  const fileName = process.env.QUOTE_FILE || 'quotes.txt';
  const filePath = path.join(process.cwd(), fileName);

  try {
    // 2. 텍스트 파일 읽기 및 줄바꿈 단위로 쪼개기
    const data = fs.readFileSync(filePath, 'utf-8');
    const quotes = data.split('\n').map(line => line.trim()).filter(Boolean);

    if (quotes.length === 0) {
      return "등록된 대사가 없습니다.";
    }

    // 3. 무작위로 대사 하나 선택
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return randomQuote;
  } catch (error) {
    console.error("파일을 읽는 중 오류가 발생했습니다:", error);
    return "대사 파일을 찾을 수 없습니다.";
  }
}
