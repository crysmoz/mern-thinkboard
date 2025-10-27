import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center">
        <ZapIcon className="size-10 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">⚡ Rate Limit Reached</h3>
        <p className="text-base-content mb-1">
          You've made too many requests in a short period. Please wait a few seconds.
        </p>
        <p className="text-sm text-base-content/70">
          Try again soon for the best experience.
        </p>
      </div>
    </div>
  );
};

export default RateLimitedUI;
