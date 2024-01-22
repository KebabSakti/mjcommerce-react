import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import RefreshButton from "./refresh-button";

export default function ErrorBoundary({ children }: any) {
  const state = useAppSelector((state: RootState) => state.layout.value);

  if (state.error) {
    return (
      <>
        <div className="min-h-screen bg-background flex flex-col gap-4 justify-center items-center text-onBackground">
          <div>{state.error.message}</div>
          <RefreshButton
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
      </>
    );
  }

  return children;
}
