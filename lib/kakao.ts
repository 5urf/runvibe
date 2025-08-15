let kakaoLoaded = false;
let kakaoInitialized = false;

export const loadKakaoSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (kakaoLoaded && window.Kakao) {
      resolve();
      return;
    }

    if (typeof window === "undefined") {
      reject(new Error("Window is not available"));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js";
    script.integrity =
      "sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      kakaoLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Kakao SDK"));
    };

    document.head.appendChild(script);
  });
};

export const initKakao = async (): Promise<boolean> => {
  try {
    await loadKakaoSDK();

    if (!window.Kakao) {
      throw new Error("Kakao SDK not found");
    }

    if (!kakaoInitialized) {
      const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
      if (!appKey) {
        throw new Error("Kakao App Key not found");
      }

      window.Kakao.init(appKey);
      kakaoInitialized = true;
    }

    return true;
  } catch (error) {
    console.error("Kakao initialization failed:", error);
    return false;
  }
};

export interface KakaoShareData {
  title: string;
  description: string;
  linkUrl: string;
  imageUrl: string;
}

export const shareToKakao = async (data: KakaoShareData) => {
  try {
    const initialized = await initKakao();
    if (!initialized) {
      throw new Error("Kakao initialization failed");
    }

    const content = {
      title: data.title,
      description: data.description,
      link: {
        mobileWebUrl: data.linkUrl,
        webUrl: data.linkUrl,
      },
      imageUrl: data.imageUrl,
    };

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content,
      buttons: [
        {
          title: "🏃‍♂️ 나도 테스트하기",
          link: {
            mobileWebUrl: data.linkUrl,
            webUrl: data.linkUrl,
          },
        },
      ],
      installTalk: true,
    });

    return true;
  } catch (error) {
    console.error("Kakao share failed:", error);
    throw error;
  }
};

export const createShareData = (
  runnerType: string,
  emoji: string,
  description: string,
  resultId: string
): KakaoShareData => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

  return {
    title: `🏃‍♂️ 나는 ${runnerType}!`,
    description: `RunVibe 러닝 취향 분석 결과\n\n${emoji} ${description}\n\n✨ 나도 테스트해보기`,
    linkUrl: `${baseUrl}/result/${resultId}`,
    imageUrl: `${baseUrl}/api/og-image/${resultId}`,
  };
};
