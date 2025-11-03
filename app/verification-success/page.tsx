"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerificationSuccess() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50/20 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-stone-200">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 mb-4">
              You&apos;re Entered!
            </h1>
            <p className="text-lg text-stone-600">
              Your email has been verified successfully.
            </p>
          </div>

          {email && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
              <p className="text-green-800 text-sm">
                <strong>Confirmed Email:</strong> {email}
              </p>
            </div>
          )}

          <div className="bg-stone-50 rounded-xl p-6 mb-6">
            <p className="text-stone-700 mb-4">
              <strong>What&apos;s Next?</strong>
            </p>
            <p className="text-stone-600 text-sm">
              The winner will be randomly selected and notified by email. Check your inbox for confirmation details.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-davidoff-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-stone-800 transition-all duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

