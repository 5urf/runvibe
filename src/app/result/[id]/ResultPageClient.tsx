"use client";

import { RetakeButton, ShareModal } from "@/components/result";
import { Button } from "@/components/ui";
import { ITestResultWithTypeInfo } from "@/types/test";
import Link from "next/link";
import { useState } from "react";

interface IResultPageClientProps {
  result: ITestResultWithTypeInfo;
}

const ResultPageClient = ({ result }: IResultPageClientProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleOpenShareModal = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      <section className='space-y-4'>
        <Button
          variant='gradient'
          size='lg'
          onClick={handleOpenShareModal}
          className='w-full flex items-center justify-center space-x-2 text-lg py-4'
        >
          <span className='text-2xl'>📱</span>
          <span>결과 공유하기</span>
        </Button>
        <div className='grid grid-cols-2 gap-3'>
          <RetakeButton resultId={result.id} />
          <Link href='/'>
            <Button
              variant='secondary'
              className='w-full flex items-center justify-center space-x-2'
            >
              <span>🏠</span>
              <span>홈으로</span>
            </Button>
          </Link>
        </div>
      </section>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        result={result}
      />
    </>
  );
};

export default ResultPageClient;
