import { cookies } from "next/headers";

export const PARTICIPATION_COOKIE = "runvibe_participated";

export async function getParticipationFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const participationCookie = cookieStore.get(PARTICIPATION_COOKIE);

  return participationCookie?.value || null;
}

export async function setParticipationCookie(resultId: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(PARTICIPATION_COOKIE, resultId, {
    maxAge: 365 * 24 * 60 * 60,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

// 쿠키 삭제 (재참여용)
export async function clearParticipationCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(PARTICIPATION_COOKIE);
}
