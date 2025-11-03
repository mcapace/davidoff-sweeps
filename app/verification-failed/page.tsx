"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

function VerificationFailedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  const getErrorMessage = () => {
    switch (reason) {
      case 'missing-token':
        return 'The verification link is missing a token. Please check your email and try again.';
      case 'invalid-token':
        return 'The verification link is invalid or has expired. Please request a new verification email.';
      case 'entry-not-found':
        return 'We could not find your sweepstakes entry. Please try entering again.';
      case 'server-error':
        return 'An error occurred while processing your verification. Please try again later.';
      default:
        return 'Verification failed. Please try again or contact support.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50/20 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-stone-200">
          <div className="text-center mb-8">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 mb-4">
              Verification Failed
            </h1>
            <p className="text-lg text-stone-600">
              {getErrorMessage()}
            </p>
          </div>

          <div className="text-center space-y-4">
            <Link
              href="/"
              className="inline-block bg-davidoff-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-stone-800 transition-all duration-300"
            >
              Return to Home
            </Link>
            <p className="text-sm text-stone-500">
              If you continue to experience issues, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerificationFailed() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50/20 flex items-center justify-center">
        <div className="text-stone-600">Loading...</div>
      </div>
    }>
      <VerificationFailedContent />
    </Suspense>
  );
}
