import { Suspense } from "react";
import BuyPage from "./buy";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyPage />
    </Suspense>
  );
}
