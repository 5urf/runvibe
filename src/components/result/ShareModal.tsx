"use client";

import { Button } from "@/components/ui";
import { ITestResultWithTypeInfo } from "@/types/test";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "../../../lib/utils";
import ShareCard from "./ShareCard";

interface IShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ITestResultWithTypeInfo;
}

const ShareModal = ({ isOpen, onClose, result }: IShareModalProps) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDownload = async () => {
    if (!shareCardRef.current) {
      toast.error("이미지를 생성할 수 없습니다.");
      return;
    }

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `RunVibe-${result.typeInfo.name}-결과.png`;
      link.href = canvas.toDataURL("image/png");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("이미지가 다운로드되었습니다!");
    } catch (error) {
      console.error("다운로드 실패:", error);
      toast.error("이미지 다운로드에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  // 링크 복사
  const handleCopyLink = async () => {
    const url = `${window.location.origin}/result/${result.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("링크가 복사되었습니다!");
    } catch (error) {
      console.error("링크 복사 실패:", error);
    }
  };

  // 네이티브 공유 (Web Share API)
  const handleNativeShare = async () => {
    const url = `${window.location.origin}/result/${result.id}`;
    const shareData = {
      title: `나는 ${result.typeInfo.name}!`,
      text: `RunVibe에서 러닝 취향을 분석했어요! ${result.typeInfo.description}`,
      url,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // 지원하지 않는 브라우저는 링크 복사로 폴백
        handleCopyLink();
      }
    } catch (error) {
      console.error("공유 취소:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      )}
      style={{ margin: 0 }}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded-3xl w-full max-h-[90vh] overflow-y-auto",
          "max-w-xl mx-auto p-4 sm:p-6 lg:p-8"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className={cn("flex justify-between items-center mb-4 sm:mb-6")}>
          <h2
            className={cn(
              "font-bold text-gray-800",
              "text-lg sm:text-xl lg:text-2xl"
            )}
          >
            결과 공유하기
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200",
              "flex items-center justify-center transition-colors"
            )}
            aria-label='모달 닫기'
          >
            ✕
          </button>
        </div>

        {/* 공유 카드 */}
        <div className={cn("flex justify-center mb-6 sm:mb-8")}>
          <div ref={shareCardRef} className='w-full max-w-md'>
            <ShareCard result={result} />
          </div>
        </div>

        {/* 공유 옵션 */}
        <div className='space-y-4'>
          <div
            className={cn(
              "text-center text-gray-600 mb-4 sm:mb-6",
              "text-sm sm:text-base"
            )}
          >
            친구들과 공유해보세요! 🎉
          </div>

          {/* 주요 공유 버튼들 */}
          <div className='grid grid-cols-1 gap-3'>
            {/* 네이티브 공유 / 링크 복사 */}
            <Button
              variant='gradient'
              size='lg'
              onClick={handleNativeShare}
              className='w-full flex items-center justify-center space-x-2'
            >
              <span className='text-2xl'>📱</span>
              <span>공유하기</span>
            </Button>

            {/* 이미지 다운로드 */}
            <Button
              variant='secondary'
              onClick={handleDownload}
              disabled={isDownloading}
              className='w-full flex items-center justify-center space-x-2'
            >
              {isDownloading ? (
                <>
                  <div className='w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin' />
                  <span>생성 중...</span>
                </>
              ) : (
                <>
                  <span className='text-xl'>💾</span>
                  <span>이미지 다운로드</span>
                </>
              )}
            </Button>

            {/* 링크 복사 */}
            <Button
              variant='secondary'
              onClick={handleCopyLink}
              className='w-full flex items-center justify-center space-x-2'
            >
              <span className='text-xl'>🔗</span>
              <span>링크 복사</span>
            </Button>
          </div>

          {/* 안내 메시지 */}
          <div className={cn("mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-2xl")}>
            <div className='flex items-start space-x-2 sm:space-x-3'>
              <span className='text-blue-500 text-lg sm:text-xl'>💡</span>
              <div className='text-xs sm:text-sm text-blue-700'>
                <div className='font-semibold mb-1'>공유 팁</div>
                <div className='leading-relaxed'>
                  카카오톡, 인스타그램 스토리에 공유하거나 이미지를 다운로드해서
                  SNS에 업로드해보세요!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
